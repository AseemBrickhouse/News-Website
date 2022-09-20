from tabnanny import verbose
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *
# Register your models here.


class AccountInline(admin.StackedInline):
    model = Account
    can_delete = False
    verbose_name_plural = 'Accounts'

class UserAdmin(BaseUserAdmin):
    inlines = (AccountInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Account)
admin.site.register(Settings)
admin.site.register(Followers)
admin.site.register(Article)
admin.site.register(BookmarkedArticles)
