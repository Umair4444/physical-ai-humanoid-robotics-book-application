# Backup and Recovery Procedures: Qdrant RAG Chatbot

## Overview
This document outlines the procedures for backing up and recovering the Qdrant RAG Chatbot system, ensuring data integrity and service continuity.

## Backup Strategy

### Backup Types
1. **Qdrant Vector Database**: Full backup of vector embeddings and metadata
2. **Application Configuration**: Environment variables and settings
3. **Document Content**: Textbook content from docs directory
4. **Application Code**: Version-controlled source code (via Git)

### Backup Schedule
- **Qdrant Data**: Daily full backup, hourly incremental (if supported)
- **Application Configuration**: On change
- **Document Content**: Daily or on content update
- **Application Code**: Automatically via Git on each commit

## Qdrant Vector Database Backup

### Backup Procedures

#### Using Qdrant Snapshots (Recommended)
```bash
# Create a snapshot via the Qdrant API
curl -X POST "http://your-qdrant-host:6333/collections/textbook_knowledge/snapshots"

# The snapshot will be created in the configured snapshots directory
# Default location: /qdrant/storage/snapshots/ or volume mount
```

#### Using Docker (for local deployments)
```bash
# For Docker-based Qdrant, backup the volume
docker run --rm -v qdrant_data:/source -v /backup/location:/backup alpine tar czf /backup/qdrant-backup-$(date +%Y%m%d-%H%M%S).tar.gz -C /source .
```

#### Using Qdrant Cloud
1. Access the Qdrant Cloud dashboard
2. Navigate to your cluster
3. Use the backup/restore functionality provided in the interface
4. Schedule automatic backups if available

### Backup Verification
```bash
# List available snapshots
curl -X GET "http://your-qdrant-host:6333/collections/textbook_knowledge/snapshots"

# Verify the latest snapshot exists and is accessible
# Check the backup file size and creation time
ls -la /path/to/snapshots/
```

## Application Configuration Backup

### Environment Variables
Store configuration securely using one of these methods:

#### 1. Configuration Management Tool
```bash
# Example using a configuration management tool
# Backup configuration to a secure location
config-manager backup --service rag-chatbot --destination s3://backup-bucket/configs/
```

#### 2. Encrypted Files
```bash
# Create an encrypted backup of environment variables
tar czf - .env.production | gpg --encrypt --recipient admin@example.com > config-backup-$(date +%Y%m%d).gpg
```

### Configuration Verification
```bash
# Verify configuration backup integrity
# For encrypted backups:
gpg --decrypt config-backup-$(date +%Y%m%d).gpg | tar tzf -

# Verify the backup contains the expected files
```

## Document Content Backup

### Backup Procedures
```bash
# Create a backup of the docs directory
tar czf docs-backup-$(date +%Y%m%d).tar.gz -C /path/to/project/ docs/

# For cloud storage
aws s3 cp docs-backup-$(date +%Y%m%d).tar.gz s3://backup-bucket/docs/
```

### Verification
```bash
# List the contents of the backup
tar tzf docs-backup-$(date +%Y%m%d).tar.gz

# Verify all files are present
tar tzf docs-backup-$(date +%Y%m%d).tar.gz | wc -l
```

## Recovery Procedures

### Qdrant Vector Database Recovery

#### From Snapshots
```bash
# List available snapshots
curl -X GET "http://your-qdrant-host:6333/collections/textbook_knowledge/snapshots"

# Restore from a specific snapshot
curl -X POST "http://your-qdrant-host:6333/collections/textbook_knowledge/snapshots" \
  -H "Content-Type: application/json" \
  -d '{
    "location": "http://your-storage/snapshot-file.tar",
    "api_key": "your-api-key"
  }'
```

#### From Docker Volume Backup
```bash
# Stop the Qdrant container
docker stop qdrant

# Restore the volume from backup
docker run --rm -v qdrant_data:/target -v /backup/location:/backup alpine tar xzf /backup/qdrant-backup-YYYYMMDD-HHMMSS.tar.gz -C /target

# Start the Qdrant container
docker start qdrant
```

### Application Configuration Recovery

#### From Encrypted Backup
```bash
# Decrypt and restore configuration
gpg --decrypt config-backup-YYYYMMDD.gpg | tar xzf - -C /path/to/app/

# Set appropriate permissions
chmod 600 .env.production
```

### Document Content Recovery
```bash
# Extract the docs backup
tar xzf docs-backup-YYYYMMDD.tar.gz -C /path/to/project/

# Verify content integrity
find docs/ -name "*.mdx" | wc -l
```

## Full System Recovery Process

### Step 1: Assess the Situation
1. Determine the scope of data loss
2. Identify which components need to be restored
3. Verify backup availability and integrity

### Step 2: Prepare Recovery Environment
1. Ensure sufficient storage space
2. Prepare necessary tools and credentials
3. Plan for potential downtime

### Step 3: Restore Components in Order
1. **Qdrant Database**: Restore the vector database first
2. **Document Content**: Restore the textbook content
3. **Application Configuration**: Restore settings and API keys
4. **Application Code**: Deploy the appropriate version

### Step 4: Verify Restoration
1. Check Qdrant connection and data integrity
2. Verify document ingestion status
3. Test RAG functionality with sample queries
4. Validate all endpoints are working

### Step 5: Monitor and Validate
1. Monitor system performance
2. Check for any data inconsistencies
3. Verify user access and functionality

## Recovery Scenarios

### Scenario 1: Partial Data Loss (Qdrant)
**Symptoms**: Some vector data missing, but system mostly functional
**Recovery Steps**:
1. Identify the missing data range
2. Restore from the most recent snapshot
3. Re-ingest any documents that were added after the snapshot
4. Verify data integrity

### Scenario 2: Complete System Failure
**Symptoms**: Entire system unavailable
**Recovery Steps**:
1. Provision new infrastructure
2. Restore Qdrant database from backup
3. Restore application configuration
4. Deploy application code
5. Re-ingest all document content
6. Verify full functionality

### Scenario 3: Configuration Loss
**Symptoms**: Application running but with incorrect settings
**Recovery Steps**:
1. Restore configuration from backup
2. Restart application to apply new settings
3. Verify all services connect properly

## Testing Backup and Recovery

### Regular Testing Schedule
- **Monthly**: Test restoration of document content
- **Quarterly**: Test full Qdrant database restoration
- **Semi-annually**: Perform full system recovery drill

### Test Procedures
```bash
# Test document content restoration
./test-docs-restore.sh

# Test Qdrant restoration to a temporary instance
./test-qdrant-restore.sh

# Full system recovery test (in staging environment)
./full-recovery-test.sh
```

### Verification Scripts
Create automated scripts to verify backup integrity:

```bash
#!/bin/bash
# verify-backups.sh

echo "Verifying backup integrity..."

# Check Qdrant snapshots
echo "Checking Qdrant snapshots..."
curl -s -X GET "http://your-qdrant-host:6333/collections/textbook_knowledge/snapshots" | jq '.result | length'

# Check docs backup
echo "Checking docs backup..."
if [ -f "docs-backup-$(date +%Y%m%d).tar.gz" ]; then
    echo "Docs backup exists and is accessible"
    tar tzf docs-backup-$(date +%Y%m%d).tar.gz | head -5
else
    echo "ERROR: Docs backup not found"
    exit 1
fi

echo "Backup verification completed"
```

## Backup Monitoring and Alerts

### Key Metrics to Monitor
- Backup completion status
- Backup size (should be consistent)
- Backup duration
- Storage space usage

### Alert Conditions
- Backup failure
- Backup size significantly different than expected
- Backup taking longer than expected
- Storage space running low

## Security Considerations

### Backup Encryption
- Encrypt sensitive configuration backups
- Use appropriate access controls for backup storage
- Regularly rotate encryption keys

### Access Control
- Limit access to backup storage
- Use separate credentials for backup operations
- Audit backup and restore activities

## Retention Policy

### Backup Retention Schedule
- **Daily backups**: Keep for 30 days
- **Weekly backups**: Keep for 90 days
- **Monthly backups**: Keep for 1 year
- **Annual backups**: Keep for 7 years (or as required by compliance)

### Cleanup Procedures
```bash
# Remove backups older than retention period
find /backup/location -name "qdrant-backup-*.tar.gz" -mtime +30 -delete
find /backup/location -name "docs-backup-*.tar.gz" -mtime +30 -delete
```

## Contact Information

### In Case of Data Loss
- Primary: [System Administrator Contact]
- Secondary: [Development Team Contact]
- Escalation: [Management Contact]

### Backup System Contacts
- Qdrant Administrator: [Contact Information]
- Infrastructure Team: [Contact Information]
- Security Team: [Contact Information]