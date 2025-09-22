#!/bin/bash

# Script to re-enable SQL initialization after successful deployment
echo "🔄 Re-enabling SQL initialization..."

# Update application.properties
sed -i '' 's/spring.sql.init.mode=never/spring.sql.init.mode=always/' clean-spring-boot/src/main/resources/application.properties
sed -i '' 's/# spring.sql.init.data-locations=classpath:data.sql/spring.sql.init.data-locations=classpath:data.sql/' clean-spring-boot/src/main/resources/application.properties
sed -i '' 's/# spring.sql.init.schema-locations=classpath:schema.sql/spring.sql.init.schema-locations=classpath:schema.sql/' clean-spring-boot/src/main/resources/application.properties

echo "✅ SQL initialization re-enabled"
echo "📋 Next steps:"
echo "1. Test locally: ./mvnw spring-boot:run"
echo "2. Commit changes: git add . && git commit -m 'Re-enable SQL initialization'"
echo "3. Push to GitHub: git push origin main"
echo "4. Render will auto-deploy with data seeding"
