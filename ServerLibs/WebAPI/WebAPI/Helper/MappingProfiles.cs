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
        }
    }
}
