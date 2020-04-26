from rest_framework import serializers
from api.models import  Restaurant, Order, Review, Dish
from django.contrib.auth.models import User
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'email', 'is_staff')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    encoder = BCryptSHA256PasswordHasher()

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name')

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = self.encoder.encode(password, salt=self.encoder.salt())
        user = User.objects.create(password=hashed_password, **validated_data)
        user.save()
        return user


class RestaurantSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    image_url = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    contact = serializers.CharField(required=True)
    avg_cost = serializers.IntegerField(required=True)

    def create(self, validated_data):
        restaurant = Restaurant(**validated_data)
        restaurant.save()
        return restaurant

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.image_url = validated_data.get('image_url', instance.image_url)
        instance.address = validated_data.get('address', instance.address)
        instance.contact = validated_data.get('contact', instance.contact)
        instance.avg_cost = validated_data.get('avg_cost', instance.avg_cost)
        instance.save()
        return instance


class DishSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    price = serializers.IntegerField(required=True)
    image_url = serializers.CharField(required=True)
    restaurant = RestaurantSerializer(read_only=True)

    
    class Meta:
        model = Dish
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    text = serializers.CharField(required=True)
    user = UserSerializer(read_only=True)
    restaurant = RestaurantSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ('text', 'user', 'restaurant')



class OrderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    dish_name = serializers.CharField(required=True)
    count = serializers.IntegerField(required=True)
    user = UserSerializer(read_only=True)
    dish_url = serializers.CharField(required=True)
    
    class Meta:
        model = Order
        fields = '__all__'
