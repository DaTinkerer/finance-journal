from django.urls import path
from .views import JournalEntryViewset

urlpatterns = [
    path('', JournalEntryViewset.as_view({'get': 'list'})),
    path('create/', JournalEntryViewset.as_view({'post': 'create'})),
    path('update/<int:pk>/', JournalEntryViewset.as_view({'post': 'partial_update'})),
    path('delete/<int:pk>/', JournalEntryViewset.as_view({'post': 'destroy'})),
]
