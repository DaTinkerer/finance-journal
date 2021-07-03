from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from accounts.models import User
from .models import Entry
from .serializers import EntrySerializer
from rest_framework import viewsets

class JournalEntryViewset(viewsets.ModelViewSet):
    
    
    permission_classes = [permissions.IsAuthenticated]
      
    serializer_class = EntrySerializer

    def get_queryset(self):
        user = self.request.user
        
        return Entry.objects.filter(user=user)


        

     