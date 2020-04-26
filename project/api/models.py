from django.db import models
from django.contrib.auth.models import User


class Restaurant(models.Model):
    name = models.CharField(max_length=50, default='')
    image_url = models.CharField(max_length=255, default='')
    address = models.CharField(max_length=100, default='')
    contact = models.CharField(max_length=100, default='')
    avg_cost = models.IntegerField(default=3000)
    def __str__(self):
        return '{}'.format(self.name)


class Dish(models.Model):
    name = models.CharField(max_length=50, default='')
    price = models.IntegerField(default=3000)
    image_url = models.CharField(max_length=255, default='')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE,
                                   related_name='dishes')
                
    class Meta:
        verbose_name = 'Dish'
        verbose_name_plural = 'Dishes'

    def __str__(self):
        return '{}'.format(self.name)


class Review(models.Model):
    text = models.TextField()
    user = models.ForeignKey('auth.User', related_name='owner', on_delete= models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE,
                                   related_name='reviews')

    def __str__(self):
        return '{}: {}'.format(self.user, self.restaurant)


class OrderManager(models.Manager):
    def for_user(self, user):
        return self.filter(user=user)


class Order(models.Model):
    dish_name = models.CharField(max_length=200, default='')
    count = models.IntegerField(default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    dish_url = models.CharField(max_length=255)
    objects = OrderManager()

    def __str__(self):
        return '{}: {}'.format(self.dish_name, self.count)
