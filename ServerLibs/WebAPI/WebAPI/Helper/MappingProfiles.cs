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
            CreateMap<ProductDto, Product>();

            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();

            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();

            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<Discount, DiscountDto>();
            CreateMap<DiscountDto, Discount>();

            CreateMap<Sale, SaleDto>();
            CreateMap<SaleDto, Sale>();
        }
    }
}
