from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters
from django.http import JsonResponse
from api.models import Restaurant, Dish, Order, Review
from api.serializers import  RestaurantSerializer, DishSerializer, OrderSerializer, ReviewSerializer

from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework import generics
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from api.serializers import UserSerializer, RegisterSerializer

class Restaurants(APIView):
    filter_backends = (filters.OrderingFilter,)
    ordering = ('name', )

    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=500)


class RestaurantView(APIView):
    def get_object(self, pk):
        try:
            return Restaurant.objects.get(id=pk)
        except Restaurant.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        restaurant = self.get_object(pk)
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)

    def put(self, request, pk):
        restaurant = self.get_object(pk)
        serializer = RestaurantSerializer(instance=restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        restaurant = get_object_or_404(Restaurant, pk=pk)
        restaurant.delete()
        return Response(status=204)


class Dishes(generics.ListCreateAPIView):
    serializer_class = DishSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering = ('price',)

    def get_queryset(self):
        return Dish.objects.filter(restaurant=self.kwargs['pk'])

    def perform_create(self, serializer):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['pk'])
        serializer.save(restaurant=restaurant)


class DishView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer


class Reviews(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    def get_object(self, pk):
        try:
            return Restaurant.objects.get(id=pk)
        except Restaurant.DoesNotExist:
            raise Http404

    def get_queryset(self):
        return Review.objects.filter(restaurant=self.kwargs['pk'])

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            restaurant = get_object_or_404(Restaurant, id=self.kwargs['pk'])
            serializer.save(user=self.request.user, restaurant=restaurant)

class Orders(generics.ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.for_user(self.request.user)

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(owner=self.request.user)


class OrderView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)


class Clearer(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        Order.objects.filter(user=request.user).delete()
        return Response(status=204)

class Login(APIView):
    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_info = User.objects.get(username=user)
        serializer = UserSerializer(user_info)
        is_admin = serializer.data['is_staff']
        name = serializer.data['first_name']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'is_admin': is_admin, 'name': name})


@api_view(['POST'])
def logout(request):
    request.authtoken=''

    request.username=''
    return Response(status=204)


class Register(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserInfo(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user
