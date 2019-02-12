from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from ecomapp.models import Category, SubCategory, Product, InfoImages, ProductSize, ProductSizeStock, Cart, CartItem, \
    PromotionImg, Order, Comment
from ecomapp.serializers import CommentPreviewSerializer
from rest_framework import generics
from ecomapp.forms import OrderForm, RegistrationForm, LoginForm
from django.contrib.auth import login, authenticate
from decimal import Decimal
from rest_framework import viewsets
from .serializers import *


def base_view(request):
    # object это менеджер модели у него есть методы фильтр order и тд
    products = Product.objects.all()
    promotionimgs = PromotionImg.objects.all()
    categories = Category.objects.all()
    sub_categorys = SubCategory.objects.all()
    # navigation_items = CategorysTree.objects.all()
    # dep_list = list()
    # cat_list = []
    # sub_cat_list = []
    # for i in navigation_items:
    #     if i.dep not in dep_list:
    #         print(i.dep)
    #         dep_list.append(i.dep)
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
        # request.session['total'] = cart.items.count()
        # если этот блок не срабатывает, попадаем в блок exсept
    except:
        # создаем  корзину
        cart = Cart()
        cart.save()
        # присваем id id новой корзины
        # в сессию записываем cart_id
        request.session['cart_id'] = cart.id
    summ, items, items_of_cart = get_cart_info(cart)
    # словарь который заменит пустой словарь в return для отображения цикл в html
    context = {
        'categories': categories,
        'sub_categorys': sub_categorys,
        'products': products,
        'cart': cart,
        'promotionimgs': promotionimgs,
        'items_of_cart': items_of_cart,
        'summ': summ,
        'items': items,
    }
    return render(request, 'base.html', context)

# def sub_and_cat_of_department(navigation_different):
#         return cat



# ф-я для view продукта
def product_view(request, product_slug):
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
    except:
        cart = Cart()
        cart.save()
        request.session['cart_id'] = cart.id
    product = Product.objects.get(slug=product_slug)
    categories = Category.objects.all()
    sub_category = SubCategory.objects.all()
    infoimg = InfoImages.object.all()
    productsize = ProductSize.objects.all()
    sizestock = ProductSizeStock.objects.all()
    comments = Comment.objects.all()
    summ, items, items_of_cart = get_cart_info(cart)
    context = {
        'categories': categories,
        'sub_category': sub_category,
        'product': product,
        'cart': cart,
        'summ': summ,
        'items': items,
        'items_of_cart': items_of_cart,
        'productsize': productsize,
        'sizestock': sizestock,
        'infoimg': infoimg,
    }

    return render(request, 'product.html', context)




# ф-я для view category
def category_view(request, category_slug):
    category = Category.objects.get(slug=category_slug)
    categories = Category.objects.all()
    # чтобы отображались продукты опр категории
    products_of_category = Product.objects.filter(category=category)
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
        # request.session['total'] = cart.items.count()
        # если этот блок не срабатывает, попадаем в блок exсept
    except:
        # создаем  корзину
        cart = Cart()
        cart.save()
        # в сессию записываем cart_id
        request.session['cart_id'] = cart.id
    summ, items, items_of_cart = get_cart_info(cart)
    context = {
        'category': category,
        'categories': categories,
        'products_of_category': products_of_category,
        'cart': cart,
        'summ': summ,
        'items': items,
        'items_of_cart': items_of_cart,
    }
    return render(request, 'category.html', context)

def sub_category_view(request, sub_category_slug):
    sub_category = SubCategory.objects.get(slug=sub_category_slug)
    categories = Category.objects.all()
    # чтобы отображались продукты опр категории
    products_of_sub_category = Product.objects.filter(sub_category=sub_category)
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
        # request.session['total'] = cart.items.count()
        # если этот блок не срабатывает, попадаем в блок exсept
    except:
        # создаем  корзину
        cart = Cart()
        cart.save()
        # в сессию записываем cart_id
        request.session['cart_id'] = cart.id
    summ, items, items_of_cart = get_cart_info(cart)
    context = {
        'sub_category': sub_category,
        'categories': categories,
        'products_of_sub_category': products_of_sub_category,
        'cart': cart,
        'summ': summ,
        'items': items,
        'items_of_cart': items_of_cart,
    }
    return render(request, 'sub_category.html', context)


def cart_view(request):
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
        # request.session['total'] = cart.items.count()
        # если этот блок не срабатывает, попадаем в блок exсept
    except:
        # создаем  корзину
        cart = Cart()
        cart.save()
        # в сессию записываем cart_id
        request.session['cart_id'] = cart.id
    categories = Category.objects.all()
    # items_of_cart = CartItem.objects.filter(cart=cart)
    summ, items, items_of_cart = get_cart_info(cart)
    context = {
        'cart': cart,
        'items_of_cart': items_of_cart,
        'summ': summ,
        'categories': categories,
        'items': items,
    }
    return render(request, 'cart.html', context)


def get_cart_info(cart):
    items_of_cart = CartItem.objects.filter(cart=cart)
    summ = 0
    items = 0
    for item in items_of_cart:
        item.item_total_price = item.amount * item.product.price
        summ += item.amount * item.product.price
        items += item.amount
    return summ, items, items_of_cart


# view для добавления товара в корзину(пото будет переделано)
def add_to_cart_view(request):
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
        # request.session['total'] = cart.items.count()
        # если этот блок не срабатывает, попадаем в блок exсept
    except:
        # создаем  корзину
        cart = Cart()
        cart.save()
        # присваем id id новой корзины
        # в сессию записываем cart_id
        request.session['cart_id'] = cart.id
    product_slug = request.GET.get('product_slug')
    product_size = request.GET.get('product_size')
    size = ProductSize.objects.get(id=product_size)
    product = Product.objects.get(slug=product_slug)
    for item in CartItem.objects.filter(cart=cart, product=product):
        if (product.id == item.product.id) and (size == item.size):
            item.amount += 1
            item.price += item.product.price
            item.save()
            summ, items, items_of_cart = get_cart_info(cart)
            return JsonResponse({'cart_total_amount': items})
    new_item = CartItem.objects.create(product=product, amount=1, price=product.price, cart=cart, size=size)
    new_item.save()
    summ, items, items_of_cart = get_cart_info(cart)
    return JsonResponse({'cart_total_amount': items, 'cart_summ': summ})


def remove_from_cart_view(request):
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
    except:
        cart = ()
        cart.save()
        request.session['cart_id'] = cart.id
    product_slug = request.GET.get('product_slug')
    product = Product.objects.get(slug=product_slug)
    cart_items = CartItem.objects.filter(cart=cart)
    for item in cart_items:
        if product.slug == item.product.slug:
            CartItem.delete(self=item)
            cart_items.update()
            summ, items, items_of_cart = get_cart_info(cart)
            return JsonResponse({'cart_total_amount': items, 'cart_summ': summ})


def change_item_amount(request):
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
    except:
        cart = ()
        cart.save()
        request.session['cart_id'] = cart.id
    amount = request.GET.get('amount')
    item_id = request.GET.get('item_id')
    cart_item = CartItem.objects.get(id=int(item_id))
    cart_item.amount = int(amount)
    cart_item.item_total_price = int(amount) * Decimal(cart_item.product.price)
    cart_item.save()
    summ, items, items_of_cart = get_cart_info(cart)
    return JsonResponse(
        {'cart_item_amount': cart_item.amount,
         'cart_total_amount': items,
         'item_total_price': cart_item.item_total_price,
         'cart_summ': summ})


# def choose_product_size(request):
#     try:
#         cart_id = request.session['cart_id']
#         cart = Cart.objects.get(id=cart_id)
#     except:
#         cart = ()
#         cart.save()
#         request.session['cart_id'] = cart.id
#     product_size = request.GET.get('product_size')
#
#     return JsonResponse({})


def checkout_view(request):
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
    except:
        cart = ()
        cart.save()
        request.session['cart_id'] = cart.id
    summ, items, items_of_cart = get_cart_info(cart)
    context = {
        'summ': summ,
        'items_of_cart': items_of_cart,
        'cart': cart
    }
    return render(request, 'checkout.html', context)


def order_create_view(request):
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
    except:
        cart = ()
        cart.save()
        request.session['cart_id'] = cart.id
    summ, items, items_of_cart = get_cart_info(cart)
    form = OrderForm(request.POST or None)
    context = {
        'form': form
    }
    return render(request, 'order.html', context)


def make_order_view(request):
    try:
        cart_id = request.session['cart_id']
        cart = Cart.objects.get(id=cart_id)
    except:
        cart = ()
        cart.save()
        request.session['cart_id'] = cart.id
    summ, items, items_of_cart = get_cart_info(cart)
    form = OrderForm(request.POST or None)
    if form.is_valid():
        first_name = form.cleaned_data['first_name']
        last_name = form.cleaned_data['last_name']
        phone = form.cleaned_data['phone']
        email = form.cleaned_data['email']
        buying_type = form.cleaned_data['buying_type']
        address = form.cleaned_data['address']
        comments = form.cleaned_data['comments']
        # объявляем инстанс нового заказа
        new_order = Order()
        # объявим юзера
        new_order.user = request.user
        new_order.save()
        new_order.items.add(cart)
        new_order.first_name = first_name
        new_order.last_name = last_name
        new_order.phone = phone
        new_order.email = email
        new_order.buying_type = buying_type
        new_order.address = address
        new_order.comments = comments
        new_order.total = summ
        new_order.save()
        del request.session['cart_id']
        # del request.session['total']
        # return render_to_response("thank_you")
        return HttpResponseRedirect(reverse('thank_you'))


def account_view(request):
    # фильтруем заказы и самый последний будет вверху
    order = Order.objects.filter(user=request.user).order_by('-id')
    context = {
        'order': order
    }
    return render(request, 'account.html', context)


def registration_view(request):
    form = RegistrationForm(request.POST or None)
    context = {
        'form': form
    }
    if form.is_valid():
        form.save()
        return HttpResponseRedirect(reverse('base'))
    return render(request, 'registration.html', context)


def login_view(request):
    form = LoginForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        login_user = authenticate(username=username, password=password)
        if login_user:
            login(request, login_user)
            return HttpResponseRedirect(reverse('base'))
    context = {
        'form': form
    }
    return render(request, 'login.html', context)

# class CommentViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Comment.objects.all()
#
#     def get_serializer_class(self):
#         if self.action == 'list':
#             return CommentPreviewSerializer
#         # return CommentDetailSerializer

class CommentView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentPreviewSerializer