using AutoMapper;
using WebAPI.Models;
using WebAPI.Dto;

namespace WebAPI.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<Product, ProductDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Role, RoleDto>();
            CreateMap<User, UserDto>();
            CreateMap<Discount, DiscountDto>();
            CreateMap<Sale, SaleDto>();
        }
    }
}
