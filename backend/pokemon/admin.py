from django.contrib import admin

# Register your models here.
from .models import Account, Pokemon


class AccountAdmin(admin.ModelAdmin):
    list_display = ["email","name","pk","last_login"]
    list_filter = ["is_staff","is_superuser"]
    search_fields = ["email","name"]
    class Meta:
        model = Account


class PokemonAdmin(admin.ModelAdmin):
    list_display = ["name","type","hp","attack","defense"]
    list_filter = ["type"]
    search_fields = ["name"]
    class Meta:
        model = Pokemon

admin.site.register(Account,AccountAdmin)
admin.site.register(Pokemon,PokemonAdmin)


