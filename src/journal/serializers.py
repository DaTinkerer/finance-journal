from rest_framework.serializers import ModelSerializer
from dj_rest_auth.serializers import PasswordResetSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import Entry

class EntrySerializer(ModelSerializer):
    
    
    class Meta:
        model = Entry
        
        fields = ['user', 'cost', 'category', 'date', 'id']
        read_only_fields = ['user']
