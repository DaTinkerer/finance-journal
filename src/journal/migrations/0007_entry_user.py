# Generated by Django 3.2.4 on 2021-07-26 22:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('journal', '0006_remove_entry_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='user',
            field=models.ForeignKey(default=15, on_delete=django.db.models.deletion.CASCADE, to='accounts.user'),
            preserve_default=False,
        ),
    ]
