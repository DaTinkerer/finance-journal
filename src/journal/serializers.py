from rest_framework.serializers import ModelSerializer
from .models import Entry

class EntrySerializer(ModelSerializer):
    
    class Meta:
        model = Entry

        fields = ['user', 'cost', 'category', 'timestamp', 'id']