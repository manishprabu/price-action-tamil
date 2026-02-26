# Plan: Telegram Integration for Community Announcements

This plan outlines the steps to automatically cross-post announcements from the Admin "Manage Community" tab to a Telegram channel.

## 1. Telegram Bot Setup
- [ ] **Create Bot**: Use [@BotFather](https://t.me/botfather) on Telegram to create a new bot and get the **API Token**.
- [ ] **Configure Channel**: Add the bot to your Telegram channel as an **Admin** with permission to "Post Messages".
- [ ] **Get Chat ID**: Obtain the unique Chat ID for your channel (e.g., `@your_channel_name` or a numerical ID for private channels).

## 2. Infrastructure & Backend Updates
- [ ] **Store Secrets**: Save the `TELEGRAM_BOT_TOKEN` in AWS Secrets Manager (recommended) or as a Lambda environment variable.
- [ ] **Env Variable**: Add `TELEGRAM_CHAT_ID` to the Lambda environment variables in `template.yaml`.
- [ ] **Lambda Logic**: Update the `AdminUserFunction` (or a specific community function) to:
    - Receive the announcement text.
    - Fetch the bot token.
    - Use `fetch` or `https` to call `https://api.telegram.org/bot<TOKEN>/sendMessage`.
    - Payload: `{"chat_id": "...", "text": "...", "parse_mode": "HTML"}`.

## 3. Frontend Enhancements
- [ ] **Modify `ManageCommunity`**: 
    - Update the "Post" button handler in `AdminDashboard.jsx` to call the backend API.
    - Add a loading state for the post action.
    - [Optional] Add a "Post to Telegram" checkbox to give admins control over which posts are cross-posted.

## 4. Verification Flow
- [ ] Test the API call with a mock announcement.
- [ ] Verify the message appears instantly in the Telegram channel with proper formatting.
- [ ] Ensure the frontend shows success/error feedback.
