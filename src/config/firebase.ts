import { credential, initializeApp } from 'firebase-admin';

const app = initializeApp({
  credential: credential.cert({
    projectId: 'incit-assessment',
    clientEmail:
      'firebase-adminsdk-bmdcd@incit-assessment.iam.gserviceaccount.com',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZJWuNYP0sfEiz\n86eFdb3Zxx+gmIsthAFbQ8b7EgFLs+DYrbXE4G8o01yAqCaLgkHn46Ray8XAbW3a\n/7+S5Vzaq7D8CbOmgAkKDKjfNxmYAZkr2Cc9u3msTxt+P92YjB8gv24IfmxqRA8R\niJyV99R0m4tIhg+b5Te9OpaqjWfDgTyAjQu3xwz08tjcQK/zacweelHeONrgeG+s\npHEep7lnB5xiqp2nl5yntwJ/2OZBxGAIyB+CFZk9pCNWG7Im4oEODPhhTEsMBxp7\nu/ueIyM9j7f/Lj29X6/+ecMS7fbgkm5VXRySd3KvBbJxk48DLuK/bfI2o8l/2/za\nFlwQrcqbAgMBAAECggEAB9I8au0AIQx73gzcillYB84+lEIWIY3zT8jnWZ0yyb33\nBrngZZycsLYSrFNqHIfbe89JboWnpMsx6BRVoVfrZRONp2GLdj5lt8iruzKiMPwr\n6WxRnLp9XUpw+gKi+450bIS6Rt7GBKtTJa8XaCVPCWGEPID0PR74uMZMOYudOAPG\nbLsAQH3Dn7uUi6996I2OtGrEv2B8HynKdNR6mpNqTzgeOfml4RgPFbbnVSk4PdYl\n2k8RvUGoEplEVvD6aAipQ+TQo+MjiVZiYzvPFRF2vQUzn0VaUpd8LQfrfvQfB8uZ\nCzs/4qsy1BmcIQ3VizfnK76Xsvzmt18KwoawbpWrKQKBgQDGqRsqZWFse3ZpUCSl\n0L3TcLTkA0NvxNx9JfW5tsw1hS1E8nptYpqnlBojtmL7krUKPjRwCusJFBih9dwe\nlJpiL2wIusryCM95D6VjUFfngKXxOb1UvS6AE6XSzQNQifClac9NfwKVYHPwnE6s\nq/1wWlnFDGUn3oKRpWdnusuf/wKBgQDFWUlEaRy5+6Z7YeLb25SL/loHlPSxHqzh\nROi8hq4XTKv06qcPP0Gg4eXCGX/n2XrmFhMvP9YY0u+1EJoIhKl3BBnR/xfqwlzm\nhMdBHmgywIM8S3J4kenX14vFhuICDU9YRMqHuG5mzn9iBXVUrwq3B7T+T5m/0lGv\nAXrLPchVZQKBgQCBVRKUdVAJug8K3Nwe/1i10MhTMTS0DSumZhIlh7ZGmZ8xJdNC\nZ1FcC/VAjrq+IXKvanPlBZaiYGzw9AkL957SkSD6RfFdxRKdM+xuTZ4M3xopg3eZ\nNViSlTf9lu6zfjom1k3Zm/hom1SfroMhsw7aGFgdCsbIP/otK8u4IknyrQKBgQCl\nNzShcyY7hbRAwxg7W78m3E/e3RNlXPr6tMfrXQ1OMEAdkH0/xINa/wNs1hBAt8+t\n5Hk3K0hADAfmG/n4e6esHeDH77nELee8jRiLKbuuEYFM7xTsX6vXqXo4ac24ThBJ\nI34y1XKH2wTFuTAbL1fXFzqtVVKwRpFf4+s7T4PyCQKBgEucBgS0uNc03zVWmXdY\nka9Y5yJbag+BmslQDZwldlzKZkud3/2JDh/kHEBsNcMjur/ChMFanwK9DGMg+sws\nFYa3wpiXbvVUKp6p3FWGpcUYVMmeVEShyLcOHMJfuUEPZkEdymJ2NOAX7aPgRwwH\nXDnkdeaa3on1aEdk/4bYZJm1\n-----END PRIVATE KEY-----\n',
  }),
});
const auth = app.auth();




