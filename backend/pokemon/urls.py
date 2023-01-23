from django.urls import path, include, re_path
from django.views.generic import TemplateView

from .views import *
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    # pokemon endpoints
    path('pokemon/unownedpokemon/', PokemonUnownedListView, name='unownedpokemon'),
    path('pokemon/mypokemon/', PokemonUserListView, name='mypokemon'),
    path('pokemon/allpokemon/', PokemonListView, name='allpokemon'),
    path('pokemon/addpokemon//', PokemonAddView, name='addpokemon'),
    path('pokemon/releasepokemon/', PokemonReleaseView, name='releasepokemon'),


    # upload pokemon
    path('pokemon/upload/', upload_pokemon, name='upload'),
]


urlpatterns += [re_path(r'^.*/', TemplateView.as_view(template_name='index.html'))]