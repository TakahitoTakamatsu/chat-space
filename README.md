groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|users|references|null: false, foreign_key: true|
|groups|references|null: false, foreign_key: true|

Association
- belongs_to :group
- belongs_to :user


usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|

Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through::groups_users


groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

Association
- has_many :messages
- has_many :users, through::groups_users


messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user|references|null: false, foreign_key :true|
|group|references|null: false, foreign_key :true|


Association
- belongs_to :user
- belongs_to :group
