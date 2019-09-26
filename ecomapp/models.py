from django.db import models
# сигналы нужны чтобы происходило определенное действие во время сохранения формы
from django.db.models.signals import pre_save
# ф-я slugify берет поле и делает его типа slug
from django.utils.text import slugify
# для создания ссылок на категорию и продукт
from django.urls import reverse
# чтобы взять user
from django.conf import settings
from datetime import datetime
import mptt
from mptt.models import MPTTModel, TreeForeignKey
import os


# если категории кирилицей надо установить библиотеку transliterate
# from transliterate import translit
# и сюда добавить         slug = slugify(translit(unicode(instance.name), reversed=True))

# модель для категорий товаров
class Category(models.Model):
    name = models.CharField(max_length=100)
    # у категории должна быть ссылка на себя
    slug = models.SlugField(blank=True)
    objects = models.Manager()

    # Функция отображения названия категории в админке
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category_detail', kwargs={'category_slug': self.slug})


# теперь созд миграции в терм ./manage.py makemigrations
# после этого запускаем команду ./manage.py migrate и регистрируем эту модель в admin.py

# функция автозаполнения slug при сохранении формы Category
def pre_save_Category_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        slug = slugify(instance.name)
        instance.slug = slug


pre_save.connect(pre_save_Category_slug, sender=Category)


class SubCategory(models.Model):
    name = models.CharField(max_length=300)
    slug = models.SlugField(blank=True)
    objects = models.Manager()

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('sub_category_detail', kwargs={'sub_category_slug': self.slug})

def pre_save_Sub_Category_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        slug = slugify(instance.name)
        instance.slug = slug


pre_save.connect(pre_save_Sub_Category_slug, sender=SubCategory)


# модель брендов товаров
class Brand(models.Model):
    name = models.CharField(max_length=100)
    objects = models.Manager()

    def __str__(self):
        return self.name


# функация для загрузки изображений из папки и делать им нормальное название
def image_folder(instance, filename):
    filename = instance.slug + '.' + filename.split('.')[1]
    return '{0}/{1}'.format(instance.slug, filename)


# for method  all() view only products -  available True
class ProductManager(models.Manager):
    def all(self, *args, **kwargs):
        return super(ProductManager, self).get_queryset().filter(available=True)


# модель для картинок товаров
class ProductImages(models.Model):
    # product_id = models.ForeignKey(Product, blank=True, default=None, related_name='images', on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='products/%Y/%m/%d')

    def __str__(self):
        return str(self.id)


# модель товара
class Product(models.Model):
    # ForeignKey тк у товара может быть только одна категория
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    slug = models.SlugField(blank=True)
    description = models.TextField()
    images = models.ManyToManyField(ProductImages)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    available = models.BooleanField(default=True)
    # size = models.ForeignKey(ProductSize, on_delete=models.CASCADE)
    objects = ProductManager()

    def __str__(self):
        return self.title

    # ф-я для создания ссылок на продукт во view отдельные view дляя этого
    def get_absolute_url(self):
        return reverse('product_detail', kwargs={'product_slug': self.slug})


# функция автозаполнения slug при сохранении формы Product
def pre_save_Product_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        slug = slugify(instance.title)
        instance.slug = slug


pre_save.connect(pre_save_Product_slug, sender=Product)


class Size(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class ProductSize(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, blank=True, default=None, related_name='size', on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)

    objects = models.Manager()

    def __str__(self):
        return str(self.size)


class ProductSizeStock(models.Model):
    productSize = models.ForeignKey(ProductSize, default=None, blank=True, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField(default=0)


# Function for Promofotos FileName
def image_folder_promo(instance, filename):
    ext = os.path.splitext(filename)[-1]
    filename = instance.slug
    # instance.slug + '.' + filename.split('.')[1]
    # return '{0}/{1}'.format(filename, ext.lower())
    # return 'PromoImg/' + filename + ext.lower()
    return filename + ext.lower()


class PromotionImg(models.Model):
    name = models.CharField(max_length=10, default=0)
    image = models.ImageField(upload_to=image_folder_promo)
    slug = models.SlugField(blank=True)
    objects = models.Manager()

    def __str__(self):
        return self.name


def pre_save_promoimg_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        slug = slugify(instance.name)
        instance.slug = slug


pre_save.connect(pre_save_promoimg_slug, sender=PromotionImg)


class InfoImages(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=image_folder_promo)
    slug = models.SlugField(blank=True)
    object = models.Manager()

    def __str__(self):
        return self.name


pre_save.connect(pre_save_promoimg_slug, sender=InfoImages)


# def info_image_folder(instance, filename):


class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    # summ = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    # items = models.ManyToManyField(CartItem, blank=True)
    objects = models.Manager()

    def __str__(self):
        return str(self.id)


# промежуточный вариант товара для того чтобы его можно было добавить в корзину
class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    # qty
    amount = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    item_total_price = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE, default=0)

    objects = models.Manager()

    def __str__(self):
        return 'Cart item for product {0}'.format(self.product.title)


# model for orders

ORDER_STATUS_CHOICES = (
    ('In process', 'In process'),
    ('In perform', 'In perform'),
    ('Paid', 'Paid')
)


class Order(models.Model):
    # id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    # товары заказанные чтобы корзина была сохранена
    items = models.ManyToManyField(Cart)
    total = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=300, null=True)
    buying_type = models.CharField(max_length=40, choices=(('Pickup', 'Pickup'), ('Delivery', 'Delivery')),
                                   default='Pickup')
    date = models.DateTimeField(default=datetime.now, blank=True)
    email = models.EmailField(null=True)
    comments = models.TextField(null=True)
    status = models.CharField(max_length=100, choices=ORDER_STATUS_CHOICES, null=True)

    objects = models.Manager()

    def __str__(self):
        return "Order №{0}".format(str(self.id))

#
# class CommentsManager(models.Manager):
#     def all(self, *args, **kwargs):
#         return super(CommentsManager, self).get_queryset()


# class Comment(models.Model):
#     id = models.AutoField(primary_key=True)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
#     datetime = models.DateTimeField(default=datetime.now, blank=True)
#     stars = models.DecimalField(max_digits=9, decimal_places=1, default=0)
#     title = models.CharField(max_length=300)
#     comment = models.TextField()
#     # objects = CommentsManager()
#
#     def __str__(self):
#         return str(self.id)
