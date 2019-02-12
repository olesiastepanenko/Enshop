from rest_framework import serializers
from ecomapp.models import Comment


class CommentPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'stars',
            'title',
        ]


# class CommentDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#
#         fields = [
#             'stars',
#             'title',
#             'comment'
#         ]
