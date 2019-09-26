from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from ecomapp.models import Category, SubCategory, Product


class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        return ['base']

    def location(self, item):
        return reverse(item)


class CategorySitemap(Sitemap):

    def items(self):
        return Category.objects.all()


class SubcategorySitemap(Sitemap):

    def items(self):
        return SubCategory.objects.all()


class ProductsSitemap(Sitemap):

    def items(self):
        return Product.objects.all()
# class StaticViewSitemap(Sitemap):
#
#     def items(self):
#         return ['about']
#
#     def location(self, item):
#         return reverse(item)
