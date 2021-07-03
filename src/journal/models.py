from django.db import models

from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()




class Entry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    cost = models.DecimalField(max_digits=11, decimal_places=2)

    # define spending categories
    groc = 'Groceries'
    dinning = 'Dinning and Drinks'
    no_cat = 'Uncategorized'

    # store them in list of tuples
    spending_categories = [
        (groc,'Groceries' ),
        (dinning, 'Dinning and Drinks'),
        (no_cat, 'Uncategorized')
    ]
    # create the category attribute
    category = models.CharField(
        max_length=250,
        choices=spending_categories,
        default=no_cat,
    )


    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
    def __str__(self):
        return self.category
