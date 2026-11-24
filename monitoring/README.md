# Deployment

### 1. Add Prometheus and Grafana repositories

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

### 2. Create monitoring namespace

```
kubectl create namespace monitoring
```

### 3. Install monitoring charts

```
helm upgrade --install prom prometheus-community/prometheus \
  --namespace monitoring \
  --create-namespace \
  --values prom-values.yaml

helm upgrade --install loki grafana/loki \
  --namespace monitoring \
  --values loki-values.yaml

helm upgrade --install k8smon grafana/k8s-monitoring \
  --namespace monitoring \
  --values k8smon-values.yaml

helm upgrade --install grafana grafana/grafana \
  --namespace monitoring \
  --values grafana-values.yaml
```

### 4. Confirm everything is up and running

```
helm list --namespace monitoring
kubectl get svc --namespace monitoring
kubectl get pods --namespace monitoring
```

### 5. Startup Grafana to inspect monitoring data from Prometheus and Loki

```
kubectl port-forward --namespace monitoring svc/grafana 3000:80
```

#### Get Grafana admin user password

```
kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

Access Grafana from http://localhost:3000. Login with username admin and password decoded with above command.