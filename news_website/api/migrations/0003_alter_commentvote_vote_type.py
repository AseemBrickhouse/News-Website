# Generated by Django 3.2 on 2023-08-15 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_commentvote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentvote',
            name='vote_type',
            field=models.CharField(default='neutral', max_length=12),
        ),
    ]
