from djoser.serializers import UserCreateSerializer, UserSerializer

from django.contrib.auth import get_user_model

Account = get_user_model()

class AccountSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Account
        fields = ('id','email','name','password')
