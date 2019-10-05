groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

Association
- belongs_to :group
- belongs_to :user


usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|

Association
- has_many :groups
- has_many :message
- has_many :users_groups
- has_many :group, through::group_users


groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

Association
- belongs_to :users
- has_many :message
- has_many :users, through::group_users


messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|strings||
|users_id|integer|null: false, foreign_key :true|
|groups_id|integer|null: false, foreign_key :true|


Association
- belongs_to :users
- belongs_to :groups
- belongs_to :groups_users
