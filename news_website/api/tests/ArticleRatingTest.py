import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable to your project's settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysites.settings')

# Initialize Django
django.setup()
from rest_framework import status
from rest_framework.test import APIRequestFactory
from django.test import TestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import force_authenticate
from ..models import Article, ArticleRating, Account, Followers, BookmarkedArticles, Comment, CommentVote

#fix this some other time
class ArticleRatingViewTestCase(TestCase):
    def setUp(self):
        self.client = APIRequestFactory()
        # Set up necessary data for your tests, such as creating articles and accounts
        token = Token.objects.get(user__username='lauren')
        self.account = Account.objects.create(user=token, first_name="John", last_name="Doe")
        self.article = Article.objects.create(key="test_article", headline="Test Article", reporter_account=self.account)
        self.article_id = self.article.key  # Assuming 'key' is the primary key of Article model

    def test_article_rating_methods(self):
        # Test the ArticleRating model methods
        article_rating = ArticleRating.objects.create(account=self.account, article=self.article, has_vote=True, vote_type='upvote')
        
        # Test __str__ method
        self.assertEqual(str(article_rating), f"{self.account} voted: True")
        
        # Test get_has_vote property
        self.assertTrue(article_rating.get_has_vote)

    def test_article_rating_view(self):
        # Test the ArticleRatingView API endpoints
        url = f'/path/to/article/{self.article_id}/rating/'  # Replace with actual URL
        data = {'type': 'upvote'}  # Example data for upvoting

        # Test POST request
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Test GET request
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('upvote_count', response.data)
        self.assertIn('downvote_count', response.data)
        self.assertIn('current_article_rating_vote', response.data)

    # Add more test methods for other models and their functionalities
