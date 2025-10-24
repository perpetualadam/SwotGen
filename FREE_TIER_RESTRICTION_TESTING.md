# Free Tier Restriction System - Testing Guide

## Overview
This document outlines the testing procedures for the free tier restriction system that limits non-premium users to SWOT Analysis only and restricts export formats.

## Implementation Summary

### Changes Made

#### 1. InputForm.js - Framework Access Restrictions
- Added `isPremium` state that reads from localStorage
- Non-premium users can only select SWOT Analysis
- Premium frameworks show "🔒 Premium" badge in dropdown
- Premium frameworks are disabled in the dropdown for non-premium users
- Shows upgrade hint when user tries to select a premium framework
- Premium users have unrestricted access to all 7 frameworks

#### 2. ExportButton.js - Export Format Restrictions
- Added `isPremium` state that reads from localStorage
- **PDF Export**: Available to all users (free and premium)
- **CSV Export**: Premium-only feature with lock icon
- **JSON Export**: Premium-only feature with lock icon
- Implemented CSV export functionality
- Implemented JSON export functionality
- Shows disabled state for premium features to free users
- Tooltips indicate which features require premium

#### 3. PremiumModal.js - Updated Features List
- Updated to mention "Export in multiple formats: PDF, CSV, JSON"
- Clarifies premium benefits

## Testing Procedures

### Test 1: Non-Premium User - Framework Restrictions
**Precondition**: User is NOT premium (localStorage.isPremium !== 'true')

**Steps**:
1. Open the application
2. Look at the "Strategic Framework" dropdown
3. Verify SWOT Analysis is selectable
4. Try to select PESTLE Analysis
5. Verify the dropdown doesn't change and upgrade hint appears

**Expected Results**:
- ✅ SWOT Analysis is selectable
- ✅ PESTLE Analysis shows "🔒 Premium" badge
- ✅ Other frameworks show "🔒 Premium" badge
- ✅ Dropdown doesn't change when trying to select premium framework
- ✅ Upgrade hint appears: "🔒 Upgrade to Premium to unlock all 7 strategic frameworks"

### Test 2: Non-Premium User - Export Restrictions
**Precondition**: User is NOT premium, has analysis results

**Steps**:
1. Perform an analysis with SWOT framework
2. Look at export buttons
3. Verify PDF button is enabled
4. Try to click CSV button
5. Try to click JSON button

**Expected Results**:
- ✅ PDF button is enabled (green)
- ✅ CSV button is disabled (gray) with "🔒" lock icon
- ✅ JSON button is disabled (gray) with "🔒" lock icon
- ✅ Hovering over CSV shows: "Premium feature - Upgrade to unlock"
- ✅ Hovering over JSON shows: "Premium feature - Upgrade to unlock"
- ✅ Clicking CSV shows error: "CSV export is a premium feature. Upgrade to unlock it."
- ✅ Clicking JSON shows error: "JSON export is a premium feature. Upgrade to unlock it."

### Test 3: Premium User - Framework Access
**Precondition**: User IS premium (localStorage.isPremium === 'true')

**Steps**:
1. Set localStorage.isPremium = 'true' (via browser console or payment flow)
2. Refresh the page
3. Look at the "Strategic Framework" dropdown
4. Try to select each framework

**Expected Results**:
- ✅ All 7 frameworks are selectable
- ✅ No "🔒 Premium" badges visible
- ✅ Can select SWOT, PESTLE, Porter's Five Forces, NOISE, Balanced Scorecard, VRIO, McKinsey 7S
- ✅ No upgrade hints appear

### Test 4: Premium User - Export Formats
**Precondition**: User IS premium, has analysis results

**Steps**:
1. Perform an analysis with any framework
2. Look at export buttons
3. Click PDF button and verify download
4. Click CSV button and verify download
5. Click JSON button and verify download

**Expected Results**:
- ✅ PDF button is enabled (green) and works
- ✅ CSV button is enabled (blue) and works
- ✅ JSON button is enabled (purple) and works
- ✅ PDF file downloads with correct format
- ✅ CSV file downloads with correct format
- ✅ JSON file downloads with correct format

### Test 5: CSV Export Format Verification
**Precondition**: Premium user, has analysis results

**Steps**:
1. Export analysis as CSV
2. Open the CSV file in a text editor
3. Verify structure

**Expected Results**:
- ✅ CSV contains: Business Idea, Focus Area, Framework, Generated date
- ✅ CSV contains all categories and items
- ✅ CSV contains score information
- ✅ File is properly formatted with quotes and escaping

### Test 6: JSON Export Format Verification
**Precondition**: Premium user, has analysis results

**Steps**:
1. Export analysis as JSON
2. Open the JSON file in a text editor
3. Verify structure

**Expected Results**:
- ✅ JSON contains metadata object with: businessIdea, focusArea, framework, frameworkId, generated, platform
- ✅ JSON contains analysis object with all framework data
- ✅ JSON is properly formatted and valid
- ✅ Can be parsed by JSON parsers

### Test 7: Premium Status Persistence
**Precondition**: None

**Steps**:
1. Simulate payment by setting localStorage.isPremium = 'true'
2. Refresh the page
3. Verify premium features are still accessible
4. Close browser tab and reopen
5. Verify premium features are still accessible

**Expected Results**:
- ✅ Premium status persists after page refresh
- ✅ Premium status persists after browser restart
- ✅ All premium features remain accessible

## Deployment Status
- ✅ Code committed (commit: 6ecc99a)
- ✅ Pushed to GitHub
- ✅ Vercel deployment triggered
- ✅ Live at: https://swot-gen.vercel.app

## Notes
- Premium status is stored in localStorage with key: `isPremium`
- Lock icons use emoji: 🔒
- CSV and JSON exports are new premium features
- All existing functionality is preserved

