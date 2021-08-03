from rest_framework.serializers import ModelSerializer
from dj_rest_auth.serializers import PasswordResetSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import Entry

class EntrySerializer(ModelSerializer):
    
    
    class Meta:
        model = Entry
        
        fields = ['user', 'cost', 'category', 'date', 'id']
        read_only_fields = ['user']
        

# class CustomPasswordResetSerializer(PasswordResetSerializer):
#     def save(self):
#         request = self.context.get('request')
#         # Set some values to trigger the send_email method.
#         opts = {
#             'use_https': request.is_secure(),
#             'from_email': 'fuck.com',
#             'request': request,
#             # here I have set my desired template to be used
#             # don't forget to add your templates directory in settings to be found
#             'email_template_name': 'password_reset_email.html'
#         }

#         opts.update(self.get_email_options())
#         self.reset_form.save(**opts)