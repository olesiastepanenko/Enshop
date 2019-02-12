from django.contrib import admin
import nested_admin
from .models import Category
from .models import SubCategory
from .models import Brand
from .models import Size, ProductSize, ProductSizeStock
from .models import Product
from .models import PromotionImg, InfoImages
from .models import CartItem
from .models import Cart, Order, ProductImages, Comment

# регистрация категорий
# admin.site.register(Department)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Brand)
admin.site.register(ProductSize)
admin.site.register(Size)
admin.site.register(ProductSizeStock)
admin.site.register(PromotionImg)
admin.site.register(InfoImages)
admin.site.register(CartItem)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(ProductImages)
# admin.site.register(Comment)


class ProductSizeStockInline(nested_admin.NestedStackedInline):
    model = ProductSizeStock
    extra = 1
    # fk_name = 'Quantity of goods in stock'


class ProductSizesInline(nested_admin.NestedStackedInline):
    model = ProductSize
    inlines = [ProductSizeStockInline, ]


class ProductAdmin(nested_admin.NestedModelAdmin):
    list_display = ['id', 'category', 'sub_category', 'brand', 'title', 'description', 'price', 'available']
    list_editable = ['price', 'available']
    inlines = [ProductSizesInline, ]


admin.site.register(Product, ProductAdmin)

