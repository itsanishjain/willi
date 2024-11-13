## Todos

- [] add authentication
- [] pairing logic
- [] mindshares point systems
- [] Notification system/Email
- [] Activity/profile page
- [] Static content
- [] assest uploads

## Notes

hyperlogue == post
Insight = each participants submissions
So anyone can be a evaluator = any user
what is the pair
[insight,evaluator] = pair

what is cycle?

What are the elements?
Are they like this
Originality
Feasibility
Impact
Clarity of presentation
Alignment with goals

and creator specify them with weights at the time of hyperlogue creation?

# 15/08

- [] Edit form has wierd scrollbar
- [] add upload image
- [] add cron job api url
- [] brainstrom pairing logic

Here:

- [x] Database schema for HL creations and joins
- [x] Uploading assets to R2
- [x] Writing logic for creating and joining hyperlogues
- [x] Setting up profile page
- [x] Web3 authentication (login/logout) with Privy+ZeroDev
- [x] Page authorization
- [x] Search of HL based on titles
- [x] Pagination for HL

Next:

- Fixing UI
- Creating pairing logic (work in progress / need some help here)
- In-app notifications
- Email setup

## Errors

- Getting 404 for /profile page is becasue I check `if (isNewUser) {}` from the priviy if use created or not and not checking DB and if you created priviy accoutn withotu createUser logic you don't have user in db but with Priviy and that messesd up the logic `simple its a syncing error`

## Notifications

- When HL saved as a draft
- when HL cancels due to insufficent participants

## Todo 21/08/24

- [x] Activity page
- [x] Toast notifications
- [x] Loading states
- [x] Shadcn Datepicker
- [ ] Shadcn Forms
- [ ] Add dark mode
- [ ] Filtering based on status for the activity page
- [ ] Status for HL for all users
- [x] Draft edit page
- [x] Notifications for drafts
- [x] fix the toast for profile
- [x] fix the the upload url for profile

## Notes form Adobe Shares

https://xd.adobe.com/view/05ca0cbb-9b89-4e56-b544-883c661873ca-5099/screen/cce8a072-0472-45a6-8236-7fbfbb75040c

Who are the initiators? Assuming it's anyone who created the HL.

On page 25, we have a top bar with date, HL, and DEO. What does that mean? Also, you have My HL here. I thought we had an activity page for that—maybe we should move My HL there.

Page 60: What is fairplay management and auto translation?

Page 62: What are insight suggestions?

For the create HL page, do we need all those additional settings steps now, or is the current setup good to start with? They are based on the current website.

What does participants' choice mean?

Page 79: What does post closure mean?

Page 82: What are facilitators?

Page 87: Shouldn't the number of participants equal the number of insights submitted? I'm assuming each participant can submit only one insight.

Page 88: Regarding updating HL, where do we stand on this? Do we need to make it? It seems heavily dependent on how we create HL, so I need clarification on that first.

Page 110: Mindcast channel—do we need to work on this?

Page 119: Why do we have so many different sets of buttons on the activity page? If you choose to be an initiator, why do you still have the submit insight button?

Is "create insight" the same as "join as a participant"?

Page 130: There's a section about "start with insight suggestion." If we want that, we'll need to change the current HL creation flow.

Page 143: Evaluation step started.

Page 144: What is the content for select? I see what it does, but I'm curious—why is it there? Shouldn't it provide feedback on the entire insight?

Page 154: Cycling hours.

Page 156: Is the start evaluation button for beginning the evaluation before the official start date?

Page 176: The tab system is super confusing. For example, why do we have insight suggestions under participation tabs?

Page 184: The Transaction page has started. It seems like we need Web3 at this point.

Page 195: Ticket system.

Page 222: Okay, here we have join as a participant, which makes me question whether it's the same as create insights. It seems like it's not, but I'm confused because here you get some DEO if you join. For this to work, we might need to change the HL creation process.

## Todos 13/09

- [x] add HL if you have joined in /activity and shows status `creator`, `participant`
- [x] and then add the do evalution button to it where you are `participant` and HL is `evaluationPhaseLength and evaluationStartDate` is > `current date`

## Todos

- [] fix the MDX Description box
- [] fix the fonts
- [] add search bar to the top navbar

## Todos 16/09

- [x] fix the table for activity and main HL
- [x] pagination for activity page
- [x] fix the draft HL creation
- [] fix the profile nav avatar

- [x] make 10 HL
- [x] run pair logic on them
- [] make the evalution screen

- [] for pairing logic you are not using evaluationsPerParticipant condition
- [] at time of HL make srue Evalution date > then submission deadline

## Priviy docs for smart contract

https://docs.privy.io/guide/react/wallets/usage/requests

## Todos 28/09

- [x] Create web3 HL
- [x] Join web3 HL
- [] AA APIs
- [x] code cleanup
- [] fix the edit and evalution buttons
- [] deployed to paid vercel to test corn jobs
- []

## Todos 01/10

- [] Claim rewards
- [] refund entrance fee
- [x] fix the wallet error when it's not available
- [x] adding claim and rewards code loose logic

## Todos 03/10

- [] mainking sure all payment stuff is string for web3 settings

How claim rewards comes?

## Steps

- you need a web3 HL
- you need evalutions step => which interal need pairing logic
- you have to wait for evaluation to completed to claim you reward
- you need to call calculate reward first [can be called b creator]
- We need to call `postPayoutRoot` [have to be called by the Creator of HL]
- and when claim reward is called by the pariticatped
- then call the web3 call `claimFromHyperlogue`

## Todos 08/10

- [] make sure via which wallet/address you are currently connected use that as your wallet. fix it for create-form and join-form

### Preapare for 11/10 meet

## Todos 15/10

- [x] fix pairing logic it's too slow because of loops to find evaluatior and then add them
- [x] Make sure I've a evalution screen working
- [x] Show them the ranking page working

- [x] top nav
- [x] UI for Hls
- [x] UI for activiyu

## Todos 24/10

- [x] use MUI icons
- [x] fix UI topnav
- [x] fix UI sidenav
- [x] fix UI Hyperlogues
- [x] fix posted/discovery UI
- [x] fix detail page UI
- [x] remove not sure pages UIs
- [x] demo today meet

Here's your list with corrected grammar:

## UI Issues I'm Stuck On

- [] Ensure table headers are sticky.
- [] Adjust the top border of the HL navbar to be thicker than the text.
- [] Fix the slider on the evaluation page to display as expected.
- [] Center the image in the Markdown editor.
- [] Display a loading icon when uploading images in the Markdown editor.
- [] Make lists functional.
- [] Token timeout

# Todos 02/11

- [x] View HL when you click on the Open HL
- [x] Fix UI for preivew page -> add the dynamic navigations
- [x] posted page linking
- [x] Evalution screen connected
- [x] Matche screen
- [x] matched details screen

Open -> under submission dedline -> goes to View HL page
In progress -> unders evaluation phase ->
Posted -> after evaluation phase -> those disoverty page are here linked

- preview page
- detail page
- Join page
- detail page after posted
- do the evaluation page

# Todos 03/11

- [] add web3 to Create HL page
- [] try to make Create HL more robust

These steps are depends on joining page

- [] connect insight pages with DB
- [] do the evaluation pages backend "cron job"
- []

# Todos 04/11

- [] profile page
- [] flaging, bookmarking and sharing
- [] move to next page
  https://ideologi.vercel.app/hyperlogues/[insight_id]/insight/details
  [insight_id] aka from submission table id
  https://ideologi.vercel.app/hyperlogues/b567a65f-c3e1-4590-b66a-0f92a424f87c/posted
- fetches all the insights
- u can save them in in store
- use it move movemewnt
