#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { DynamicRenderingApiStack } from '../lib/dynamic-rendering-api-stack'

const app = new cdk.App();
new DynamicRenderingApiStack(app, 'DynamicRenderingApiStack')
