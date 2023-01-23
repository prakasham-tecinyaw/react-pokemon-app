from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Pokemon, Account, Cookies

Account = get_user_model()

class AccountSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Account
        fields = ('id','email','name','password')

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ('name', 'type', 'hp', 'attack', 'defense')

# create cookie serializer
class CookiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cookies
        fields = '__all__'