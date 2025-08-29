# 初期ユーザー作成方法

## 🐳 Dockerコンテナ内での実行（推奨）

### 方法1: ヘルパースクリプトを使用
```bash
# デフォルトコンテナ名で実行
./scripts/create_user_in_docker.sh

# カスタムコンテナ名で実行
./scripts/create_user_in_docker.sh my-container-name
```

### 方法2: 直接docker execを使用
```bash
# コンテナが実行中であることを確認
docker ps

# ユーザー作成スクリプトを実行
docker exec -it <container_name> ./create_user
```

---

