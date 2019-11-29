#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CdkSlackBotStack } from '../lib/cdk-slack-bot-stack';

const app = new cdk.App();
new CdkSlackBotStack(app, 'CdkSlackBotStack');