# Generated by Django 2.1 on 2018-12-17 08:20

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager
import ecomapp.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.PositiveIntegerField(default=1)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('item_total_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecomapp.Cart')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='InfoImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to=ecomapp.models.image_folder_promo)),
                ('slug', models.SlugField(blank=True)),
            ],
            managers=[
                ('object', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('first_name', models.CharField(max_length=200, null=True)),
                ('last_name', models.CharField(max_length=200, null=True)),
                ('phone', models.CharField(max_length=20, null=True)),
                ('address', models.CharField(max_length=300, null=True)),
                ('buying_type', models.CharField(choices=[('Pickup', 'Pickup'), ('Delivery', 'Delivery')], default='Pickup', max_length=40)),
                ('date', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('comments', models.TextField(null=True)),
                ('status', models.CharField(choices=[('In process', 'In process'), ('In perform', 'In perform'), ('Paid', 'Paid')], max_length=100, null=True)),
                ('items', models.ManyToManyField(to='ecomapp.Cart')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=500)),
                ('slug', models.SlugField(blank=True)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=9)),
                ('available', models.BooleanField(default=True)),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecomapp.Brand')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecomapp.Category')),
            ],
        ),
        migrations.CreateModel(
            name='ProductImages',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='products/%Y/%m/%d')),
            ],
        ),
        migrations.CreateModel(
            name='ProductSize',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('product', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='size', to='ecomapp.Product')),
            ],
        ),
        migrations.CreateModel(
            name='ProductSizeStock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock', models.PositiveIntegerField(default=0)),
                ('productSize', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='ecomapp.ProductSize')),
            ],
        ),
        migrations.CreateModel(
            name='PromotionImg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=0, max_length=10)),
                ('image', models.ImageField(upload_to=ecomapp.models.image_folder_promo)),
                ('slug', models.SlugField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('slug', models.SlugField(blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='productsize',
            name='size',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecomapp.Size'),
        ),
        migrations.AddField(
            model_name='product',
            name='images',
            field=models.ManyToManyField(to='ecomapp.ProductImages'),
        ),
        migrations.AddField(
            model_name='product',
            name='sub_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecomapp.SubCategory'),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecomapp.Product'),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='size',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='ecomapp.ProductSize'),
        ),
    ]
