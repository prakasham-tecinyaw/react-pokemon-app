from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
import csv

# import serializer.py
from .serializers import *
from .models import *

import requests

# create decorator the check access token from HTTP_AUTHORIZATION and return user
def get_user(request):
    token = request.META.get("HTTP_AUTHORIZATION")
    # post request with token
    # print(token)
    if token is not None:
        try:
            response = requests.post('http://127.0.0.1:8000/api/auth/jwt/verify/', json={"token": token})
            print(response.json())
        except:
            return None
    else:
        return None

# api for pokemon

# return all pokemon
@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def PokemonListView(request):
    if request.method == "GET":
        pokemon = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemon, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

# return pokemon user owns
@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def PokemonUserListView(request):
    print(request.user)   
    if request.method == "GET":
        # user = get_user(request)
        # # print(user)
        pokemon = Pokemon.objects.filter(owner=request.user)
        serializer = PokemonSerializer(pokemon, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

# return pokemon user unowns
@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def PokemonUnownedListView(request):
    if request.method == "GET":
        pokemon = Pokemon.objects.exclude(owner=request.user)
        serializer = PokemonSerializer(pokemon, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

# add a pokemon to user's collection
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def PokemonAddView(request):
    if request.method == "POST":
        serializer = PokemonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


# release a pokemon from user's collection
@csrf_exempt
@api_view(["DELETE"])
@permission_classes((AllowAny,))
def PokemonReleaseView(request, pk):
    if request.method == "DELETE":
        try:
            pokemon = Pokemon.objects.get(pk=pk)
        except Pokemon.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        pokemon.delete()
        return Response(status=HTTP_200_OK)


# upload all pokemon
def upload_pokemon(request):
    with open('pokemon.csv') as f:
            reader = csv.reader(f)
            for row in reader:
                _, created = Pokemon.objects.get_or_create(
                    name=row[0],
                    hp=row[1],
                    attack=row[2],
                    defense=row[3],
                    type=row[4],
                    )

    return HttpResponse("Uploaded pokemon")