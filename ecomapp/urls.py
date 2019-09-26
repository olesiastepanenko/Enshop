from django.urls import path, include
from django.views.generic import TemplateView
from . import views
from django.contrib.sitemaps.views import sitemap
from .sitemaps import StaticViewSitemap
from ecomapp.sitemaps import CategorySitemap, SubcategorySitemap, ProductsSitemap
from robots_txt.views import RobotsTextView


sitemaps = {
    'category_detail': CategorySitemap,
    'sub_category_detail': SubcategorySitemap,
    'product_detail': ProductsSitemap,
    'static': StaticViewSitemap,
}

urlpatterns = [
    path('category/<category_slug>/', views.category_view, name='category_detail'),
    path('sub_category/<sub_category_slug>', views.sub_category_view, name='sub_category_detail'),
    path('product/<product_slug>/', views.product_view, name='product_detail'),
    path('change_item_amount/', views.change_item_amount, name='change_item_amount'),
    path('cart/', views.cart_view, name='cart'),
    path('add_to_cart/', views.add_to_cart_view, name='add_to_cart'),
    path('remove_from_cart/', views.remove_from_cart_view, name='remove_from_cart'),
    path('checkout/', views.checkout_view, name='checkout'),
    path('order/', views.order_create_view, name='create_order'),
    path('make_order/', views.make_order_view, name='make_order'),
    path('thank_you/', TemplateView.as_view(template_name='thank_you.html'), name='thank_you'),
    path('registration', views.registration_view, name='registration'),
    path('account', views.account_view, name='account'),
    path('account', include('django_registration.backends.activation.urls')),
    path('account', include('django.contrib.auth.urls')),
    path('login', views.login_view, name='login'),
    path('', views.base_view, name='base'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
    path('robots.txt', RobotsTextView.as_view()),
    path('', include('robots_txt.urls')),
]

