const host = "https://localhost:7078/api/"
export const properties = {
    api: {
        user: { 
            login: host + "User",
            register: host + "m1/514544-474148-default/user/register",
            update: host + "m1/514544-474148-default/user/update",
        },
        cart: {
            products: host + "m1/514544-474148-default/cart/products",
            categories: host + "m1/514544-474148-default/cart/categories",
            checkout: host + "m1/514544-474148-default/cart/checkout",
        },
        admin:{
            product: { 
                new: host + "m1/514544-474148-default/admin/product/new",
                edit: host + "m1/514544-474148-default/admin/product/edit/",
                list: host + "m1/514544-474148-default/admin/product/list",
                delete: host + "m1/514544-474148-default/admin/product/delete/",
            },
            category: { 
                new: host + "m1/514544-474148-default/admin/category/new/",
                edit: host + "m1/514544-474148-default/admin/category/edit/",
                list: host + "m1/514544-474148-default/admin/category/list",
                delete: host + "m1/514544-474148-default/admin/category/delete/"
            },
        },
    }
};