using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;

using MySql.Data;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;

namespace Data
{
    internal static class QueryManager
    {
        public static readonly string connectionString = "server=127.0.0.2;uid=root;" +
            "pwd=22BurunduK@;database=salesapp";

        private static MySqlConnection _conn;

        public static void Insert(string table, IEnumerable<string> columns, IEnumerable<string> values)
        {
            string columnQuery = "", valueQuery = "";

            foreach (var column in columns) columnQuery += column + ",";
            columnQuery = columnQuery.Remove(columnQuery.Length - 1, 1);

            foreach (var value in values) valueQuery += value + ",";
            valueQuery = $"({valueQuery.Remove(valueQuery.Length - 1, 1)});";

            ExecuteQuery($"INSERT INTO {table} ({columnQuery}) VALUES {valueQuery};");
        }
        public static void Delete(string table, string condition)
        {
            ExecuteQuery($"DELETE FROM {table} WHERE {condition};");
        }
        public static MySqlDataReader Select(string table, IEnumerable<string> columns = null, string condition = null, string sort = null)
        {
            if (columns == null)
            {
                return ReadQuery($"SELECT * FROM {table}");
            }
            else
            {
                string conditionQuery = condition == null ? "" : " WHERE " + condition;
                string sortQuery = sort == null ? "" : " ORDER BY " + sort;

                string columnQuery = "";

                foreach (var column in columns) columnQuery += column + ",";
                columnQuery = columnQuery.Remove(columnQuery.Length - 1, 1);

                return ReadQuery($"SELECT {columnQuery} FROM {table}{conditionQuery}{sortQuery};");
            }
        }
        public static MySqlDataReader Select(string table, string tableJoin, IEnumerable<string> columns, string joinCondition, string condition = null, string sort = null)
        {
            string conditionQuery = condition == null ? "" : " WHERE " + condition;
            string sortQuery = sort == null ? "" : " ORDER BY " + sort;

            string columnQuery = "";

            foreach (var column in columns) columnQuery += column + ",";
            columnQuery = columnQuery.Remove(columnQuery.Length - 1, 1);

            return ReadQuery($"SELECT {columnQuery} FROM {table} INNER JOIN {tableJoin} ON {joinCondition}{conditionQuery}{sortQuery};");
        }
        public static void OpenConnection()
        {
            _conn = new MySqlConnection();
            _conn.ConnectionString = connectionString;
            _conn.Open();
        }
        public static void CloseConnection()
        {
            _conn.Close();
        }
        public static void ExecuteQuery(string query)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand(query, _conn);
                cmd.ExecuteNonQuery();
            }
            catch (MySqlException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public static MySqlDataReader ReadQuery(string query)
        {
            try
            {
                MySqlCommand cmd = new MySqlCommand(query, _conn);

                return cmd.ExecuteReader();
            }
            catch (MySqlException ex)
            {
                Console.WriteLine(ex.Message);
            }

            return null;
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            QueryManager.OpenConnection();
            /*
            QueryManager.Insert("users", new string[] {"username", "password", "role_id"}, new string[] {"'ebalay'", "'password'", "1"});
            QueryManager.Insert("users", new string[] { "username", "password", "role_id" }, new string[] { "'pidor'", "'12345'", "1" });
            QueryManager.Insert("users", new string[] { "username", "password", "role_id" }, new string[] { "'ded'", "'wasd'", "2" });
            */
            MySqlDataReader rdr = QueryManager.Select("users", "roles", new string[] { "users.id", "users.username", "roles.name" }, "users.role_id=roles.id", null, "users.id");

            while (rdr.Read())
            {
                Console.WriteLine(rdr[0] + " -- " + rdr[1] + " - " + rdr[2]);
            }
            rdr.Close();

            Console.ReadLine();
        }
    }
}
