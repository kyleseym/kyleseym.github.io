# Generated by Django 2.2.16 on 2020-09-14 14:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0008_auto_20200914_0711'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('like', models.BooleanField(default=False)),
                ('liker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gourmet', to=settings.AUTH_USER_MODEL)),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likedit', to='recipe.Recipe')),
            ],
        ),
    ]
