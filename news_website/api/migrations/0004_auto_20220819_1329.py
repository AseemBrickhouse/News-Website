# Generated by Django 3.2 on 2022-08-19 18:29

from django.db import migrations, models
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20220815_1746'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='bio',
            field=models.TextField(max_length=204, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='email',
            field=models.EmailField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='account',
            name='occupation',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='article_body',
            field=models.TextField(max_length=2000, null=True),
        ),
        migrations.AddField(
            model_name='article',
            name='tags',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('Science', 'Science'), ('Technology', 'Technology'), ('Work', 'Work'), ('School', 'School'), ('Life', 'Life'), ('Space', 'Space'), ('Outdoors', 'Outdoors')], max_length=20, null=True),
        ),
    ]