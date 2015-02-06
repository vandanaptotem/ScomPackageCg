var back_pack=[
    {
        id:1,
//        icon:"pickaxe.png",
        icon:"d1.png",
        icon_active:"a1.png",
        name:"Pickaxe",
        slide_id:2

    },
    {
        id:2,
//        icon:"Rope-SnowLeopard.png",
        icon:"d2.png",
        icon_active:"a2.png",
        name:"Rope",
        slide_id:3

    },
    {
        id:3,
//        icon:"Goggles-SnowStorm.png",
        name:"Goggles",
        icon_active:"a3.png",
        icon:"d3.png",
        slide_id:5

    },
    {
        id:4,
//        icon:"Carabiners-Security.png",
        icon:"d4.png",
        icon_active:"a4.png",
        name:"Carabiners",
        slide_id:1

    },
    {
        id:5,
//        icon:"Compass-Yeti.png",
        icon:"d5.png",
        icon_active:"a5.png",
        name:"Compass",
        slide_id:4

    }



]

var slide_config= [
    {
        slide_id:1,
        header:"GENERAL INFORMATION",
        sub_slide:[
            {
                id:1,
                sub_header:"TO WHOM DO STAR INDIA'S CORPORATE GOVERNANCE AND COMPLIANCE POLICIES APPLY?",
                sub_contents:
                    "<p>These policies apply to all employees managed and supervised by Star India and its affiliate and group companies" +
                    " in India.</p>" + "<h5>And that includes ... </h5>" +
                    "<ul style='text-align: left'>" +
                    "<li>Overseas Staff</li>" +
                    "<li> Employees of Third Party Service Providers</li>" +
                    "<li>Independent Contractors providing Services exclusively to Star India and</li>" +
                    "<li>Star India’s Affiliate and Group Companies in India</li>" +
                    "</ul>"
            },
            {
                id:2,
                sub_header:"NOW LET'S FIND OUT DIFFERENT KINDS OF POLICIES ...",
                sub_contents:
                    "The different kinds of Corporate Governance and Compliance Policies at Star India include" +
                    " <ul style='text-align: left'>" +
                    "<li>Conflict of Interest Policy</li>" +
                    "<li>Guidelines on Gifts and Entertainment</li>" +
                    "<li>Guidelines on Event Tickets</li>" +
                    "</ul>"
            },
            {
                id:3,
                sub_header:"SO, WHAT HAPPENS IF THERE IS A VIOLATION OF POLICY?",
                sub_contents:
                    "<p>If you were to be aware of a violation of the policies, you should report it.</p> " +
                    "<p>The types of issues that you can report include ...</p>" +
                    "<ul style='text-align: left'>" +
                    "<li>Theft/ Fraud/ Bribery</li>" +
                    "<li>Conflict of Interest</li>" +
                    "<li>Discrimination or Harassment</li>" +
                    "<li>Code/ Policy Violations</li>" +
                    "</ul>"
            },
            {
                id:4,
                sub_header:"SO, WHAT HAPPENS IF THERE IS A VIOLATION OF POLICY?",
                sub_contents:
                    "<p>You can report ethical concerns as well as seek guidance on the subject from either the HOD or the Compliance Team or the CGC.</p> " +
                    "<p>Please note that STAR does not permit retaliation against anyone who in good faith reports a violation or lodges a complaint.</p>"

            },
            {
                id:5,
                sub_header:"NOW LET US DISCUSS ABOUT GOVERNMENT OFFICIALS ...",
                sub_contents:
                    "As an employee of Star India, you may encounter various government officials." +
                    "<p>Remember, in reference to the Corporate Governance policies, government officials are not just people who are part of the central or state government. They also include people on the payrolls of</p>" +
                    "<ul style='text-align: left'>" +
                    "<li>Regulatory bodies such as the MIB, TRAI, etc.</li>" +
                    "<li>Local Authority/ Municipal Corporations such as the BMC</li>" +
                    "<li>State owned companies such as BSNL, MTNL, BEST, etc.</li>" +
                    "<li>Public Sector Undertakings such as SBI, LIC, etc.</li>" +
                    "<li>The Police Force or The Armed Forces</li>" +
                    "</ul>"
            },
            {
                id:6,
                sub_header:"MORE ON GOVERNMENT OFFICIALS",
                sub_contents:
                    "Also, the following are considered to be government officials ..." +
                    "<ul style='text-align: left'>" +
                    "<li>Judges or Members of the judiciary or any person appointed by a court to perform a duty</li>" +
                    "</br>" +
                    "<li>Lecturers or Professors at any university or any person who is responsible for holding or" +
                    " conducting examinations</li>" +
                    "</br>" +
                    "<li>Any member or office bearer of institutions with government affiliation or that are" +
                    " state owned or funded such as NGOs, Government Hospitals, Sporting Bodies, etc.</li>" +
                    "</ul>"
            },
            {
                id:7,
                sub_header:"DUE DILIGENCE OF THIRD PARTIES",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "1. Government/ Government Owned/ State Owned Enterprises do not need due diligence to be carried out</li>" +
                    "</br>" +
                    "</br>" +
                    "2. Due Diligence is required for any intermediary / agency / third party appointed to interact " +
                    "with the Government / Government Owned / State Owned Enterprises/ Political Parties on behalf of STAR</li>" +
                    "</br>" +
                    "</br>" +
                    "3. CGC approval will be required when ..." +
                    "<ul>" +
                    "<li>A Third Party is appointed by Star</li>" +
                    "<li>If there are any exceptions being made on the deal</li>" +
                    "<li>When entertaining, gifting or sponsoring travel for a government official</li>" +
                    "</ul>" +
                    "</li>" +
                    "</ul>"
            },
            {
                id:8,
                sub_header:"DUE DILIGENCE OF THIRD PARTIES",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "4. During the period when the Election Commission’s model code of conduct is active, CGC approval" +
                    " will not be required when political parties adhere to the code. That includes obtaining" +
                    " and retaining a copy of the Election Commission's certification of the campaign for STAR records</li>" +
                    "</br>" +
                    "</br>" +
                    "5. When making payments to Government / Government Owned/ State Owned Enterprises for routine payments" +
                    " (electricity, water, etc.) or for rentals or for licenses, permissions, etc. do not use cash</li>" +
                    "</ul>"
            }
        ]
    },
    {
        slide_id:2,
        header:"CONFLICT OF INTEREST POLICY",
        sub_slide:[
            {
                id:1,
                sub_header:"WHAT IS THE 'CONFLICT OF INTEREST POLICY'?",
                sub_contents:
                    "This policy contains guidelines to help you avoid any conflict between your private interests and" +
                    " the interests of STAR." +
                    "</br>" +
                    "</br>" +
                    "<p>We should follow the highest ethical standards at all times when acting for or on behalf of STAR. Even in our personal transactions, we must avoid situations where our own interest may potentially conflict with that of STAR. Even an appearance of such a conflict of interest is not recommended.</p>"
            },
            {
                id:2,
                sub_header:"GUIDELINES UNDER CONFLICT OF INTEREST POLICY",
                sub_contents:
                    " <ul style='text-align: left'>" +
                    "<li>" +
                    "You are not allowed to serve as a Director of any company unless " +
                    "the companies are STAR subsidiaries (such as Vijay TV) or where that Directorship" +
                    " was expressly requested by STAR*" +
                    "</li>" +
                    "</br>" +
                    "<li>" +
                    "You should NOT serve as a Director, Employee, Independent Contractor, Advisor or Consultant for" +
                    " any competitor or customer or supplier of STAR." +
                    "</li>" +
                    "</br>" +
                    "<li>" +
                    "You should NOT accept any position with another company if doing so would adversely affect" +
                    " your ability to act in the best interests of STAR or fulfil your obligations to STAR" +
                    "</li>" +
                    "</ul>"
            },
            {
                id:3,
                sub_header:"GUIDELINES UNDER CONFLICT OF INTEREST POLICY",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "<li>" +
                    "You should NOT take away a business opportunity from STAR, or divert a business " +
                    "opportunity away from STAR for your own benefit." +
                    "</li>" +
                    "</br>" +
                    "<li>" +
                    " You should not participate in the negotiation / selection or evaluation of another company" +
                    " (such as a supplier or customer) that STAR may do business with if that company has an existing" +
                    " relationship with you or your spouse/ relative." +
                    "<ul>" +
                    "<li>" +
                    "Say, your father is the owner of an agency and caters to some really big clients." +
                    "You want his clients to advertise on your channel and need Star to negotiate with your father." +
                    "You may not do this on behalf of Star. You must find someone else to do this since there is a" +
                    " conflict of interest." +
                    "</li>" +
                    "</ul>" +
                    "</li>"+
                    "</ul>"
            },
            {
                id:4,
                sub_header:"GUIDELINES UNDER CONFLICT OF INTEREST POLICY",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "<li>" +
                    "You should not participate in selection and /or evaluation of a prospective employee if" +
                    " you/ your spouse/ relative have an existing relationship with him " +
                    "<ul> " +
                    "<li>For example, you cannot select or evaluate your brother for a job. You must find someone else to do this " +
                    "since there is a conflict of interest." +
                    "</li>" +
                    "</ul>" +
                    "</br>" +
                    "</li>" +
                    "<li>" +
                    "You should NOT have a direct reporting relationship with" +
                    " someone related to you in the 21st Century Fox." +
                    "</li>" +
                    "</ul>"
            },
            {
                id:5,
                sub_header:"CONFLICT OF INTEREST POLICY – EXCEPTIONS",
                sub_contents:

                    "<ol style='text-align: left'>" +
                    "<li>You should seek prior CGC approval if you wish to serve as a Director, Employee, Independent Contractor, Advisor or Consultant for any other company/ organisation</li>" +
                    "</br>" +
                    "<li>You should seek prior CGC approval if you wish to seek or accept a government or elected or appointed political position or public office</li>" +
                    "</br>" +
                    "<li>If you wish to participate on an outside board or committee, you must submit your request for approval to the CGC before you agree to serve on the outside board or committee</li>" +
                    "</ol>"
            },
            {
                id:6,
                sub_header:"CONFLICT OF INTEREST POLICY – PROHIBITING BRIBERY",
                sub_contents:

                    "What constitutes a Bribe?" +
                    "</br>" +
                    "</br>" +
                    "The act of giving or receiving anything of value with the intention of influencing the recipient in some way favourable to the party who is giving." +
                    "</br>" +
                    "</br>" +
                    "Because it is STAR’s fundamental policy to maintain fairness and honesty in all business dealings, Bribery is looked at very unfavourably."
            },
            {
                id:7,
                sub_header:"PROHIBITING BRIBERY - GUIDELINES",
                sub_contents:

                    "<p>You must not directly or indirectly give, offer or promise to give – or accept or solicit – anything of value (either in cash or in kind) if the purpose is to improperly induce the recipient to take (or not take) action that would bestow a commercial benefit or advantage on STAR, its affiliates or any other party. </p>" +
                    "</br>" +
                    "<p>For example, you have influence with the producers of a dance reality show. A person who is being considered to judge the show offers you a watch of considerable value to put in a good word for him. Accepting the watch would mean you have accepted a bribe.</p>"
            }
        ]
    },
    {
        slide_id:3,
        header:"Gifting Policy",
        sub_slide:[
            {
                id:1,
                sub_header:"GIFTING POLICY",
                sub_contents:
                    "What is a Gift?" +
                    "</br>" +
                    "</br>" +
                    "A gift may be anything of value and includes, but is not limited to, gratuities, commissions, rebates, cash, discounts, favourable terms on any product or service, free or discounted services, prizes, transportation, use of vacation properties, stocks or other securities, home improvements, tickets," +
                    " jewellery and gift cards/ certificates or other favours."
            },
            {
                id:2,
                sub_header:"GIFTING POLICY - EXAMPLE",
                sub_contents:
                    "Providing a Third Party with tickets to an event that will not also be attended by an employee of the company accompanying the Third Party would be considered a gift rather than an entertainment expense. Donations or contributions made at the request or for the benefit of a Third Party also may be considered a gift.<br/" +
                    "</br>" +
                    "</br>" +
                    "The Policy applies regardless of whether or not the gift is in monetary form."
            },
            {
                id:3,
                sub_header:"GIVING GIFTS - GUIDELINES",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "1. Never give cash gifts, cash equivalents or gifts that can be easily converted to cash" +
                    "<ul>" +
                    "<li>For example, you cannot gift someone with a prepaid debit card</li>" +
                    "</br>" +
                    "</ul>" +
                    "</li>" +
                    "2. For festivals, you can only gift STAR branded products of the value INR 6,000 or less</li>" +
                    "</ul>"
            },
            {
                id:4,
                sub_header:"GIVING GIFTS - GUIDELINES",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "3. The cumulative value of gifts to a single person should not exceed INR 15,000/- per financial year i.e. July 01 to June 30 in the following year" +
                    "<ul>" +
                    "<li>So you may not give a client gifts 4 times a year each time of a value of Rs. 5000</li>" +
                    "</ul>" +
                    "</li>" +
                    "</br>" +
                    "4. Contest prizes – cash or cash equivalents need to be approved by CGC, all contests need to be skill–based</li>" +
                    "</ul>"
            },
            {
                id:5,
                sub_header:"EXCEPTIONS FOR GIVING GIFTS",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "<li>Gifts to any non-government third party in excess of INR 6,000 MUST receive CGC approval</li>" +
                    "</br>" +
                    "<li>Any and all gifts to a government official or government department / institution/ body (irrespective of value) MUST receive the prior written approval of the CGC</li>" +
                    "</ul>"
            },
            {
                id:6,
                sub_header:"RECEIVING GIFTS - GUIDELINES",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "<li>No gifts should be accepted from government officials or related unless approved by CGC</li>" +
                    "</br>" +
                    "<li>You may receive gifts from non-government third parties after reporting to your HOD if the cumulative value of gifts is less than Rs. 6000. In case the cumulative value of gifts is more than Rs. 6000, a written approval from CGC and HOD is required</li>" +
                    "</ul>"
            }
        ]
    },
    {
        slide_id:4,
        header:"Business Entertainment and Hospitality",
        sub_slide:[
            {
                id:1,
                sub_header:"GUIDELINES ON BUSINESS ENTERTAINMENT/ HOSPITALITY",
                sub_contents:
                    "You may sometimes, as part of your job, go out for dinners with clients/ vendors or have to accompany them to concerts, etc. You have to keep a few pointers when you are entertaining them." +
                    "</br>" +
                    "</br>" +
                    "Also remember, the form and cost of acceptable business entertainment/ hospitality will depend on a number of factors, including the nature of your role and responsibilities in the company, the nature of the relationship with the host/ guest, the cost and standard of living in the region and the acceptable forms of business entertainment/ hospitality in the region."
            },
            {
                id:2,
                sub_header:"GUIDELINES ON BUSINESS ENTERTAINMENT/ HOSPITALITY",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "1. You shall not provide entertainment or hospitality to Government Officials unless specifically authorised by STAR via a policy notification</li>" +
                    "</br>" +
                    "</br>" +
                    "2. “Entertainment expenses” may include: hosting an actual or potential client for a meal or drinks to discuss company business</li>" +
                    "<ul>" +
                    "<li>At a business-related conference</li>" +
                    "<li>At a theatrical or sporting event</li>" +
                    "<li>On a visit to a set or production facilities</li>" +
                    "<li>'Hostess clubs' and similar forms of entertainment are NOT permitted</li>" +
                    "</ul>"
            },
            {
                id:3,
                sub_header:"GUIDELINES ON BUSINESS ENTERTAINMENT/ HOSPITALITY",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "3. For private commercial employees, you must not provide or accept business entertainment/ hospitality that is in excess of INR 5,000/- per attendee per meal/ event.</li>"+
                    "</br>" +
                    "</br>" +
                    "4. At business entertainment/ hospitality functions hosted by STAR where more than one STAR representative attends, the most senior STAR representative present must pay the bill</li>"+
                    "</ul>"
            },
            {
                id:4,
                sub_header:"EXCEPTIONS",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "<li>All other requests for entertainment/ hospitality to government official would need prior written approval of the CGC.</li>" +
                    "</br>" +
                    "<li>Entertainment expenses in excess of INR 5,000/- per attendee per meal/ event for private commercial employees would require prior written approval from either one of the CEO, COO and CFO</li>" +
                    "</ul>"

            }

        ]

    },
    {
        slide_id:5,
        header:"Event Tickets",
        sub_slide:[
            {
                id:1,
                sub_header:"GUIDELINES ON EVENT TICKETS",
                sub_contents:
                    "Event tickets are company property and are provided to employees primarily for business use." +
                    "</br>" +
                    "</br>" +
                    "Events include sporting events, concerts, shows, and any/ all other events which are ticketed."
            },
            {
                id:2,
                sub_header:"GUIDELINES ON EVENT TICKETS",
                sub_contents:
                    "1. Under no circumstance should you use tickets for any personal gain. You cannot sell tickets either directly or indirectly – not online, not in person and not through a third party"
            },
            {
                id:3,
                sub_header:"GUIDELINES ON EVENT TICKETS",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "2. You cannot use event tickets to support a quid pro quo arrangement in which you personally receive a benefit (i.e. discounted or free products or services, special favours or preferential treatment)." +
                    "</br>" +
                    "</br>" +
                    "For example ..." +
                    "</br>" +
                    "</br>" +
                    "<ul>" +
                    "<li>Exchanging cricket match tickets with a friend who in return gives you concert tickets for your personal use is not acceptable</li>" +
                    "<li>Providing tickets to ANYONE with the expectation of personal future benefit or as a thank you for a personal benefit received unrelated to company business initiatives is not acceptable</li>" +
                    "</ul>"
            },
            {
                id:4,
                sub_header:"GUIDELINES ON EVENT TICKETS",
                sub_contents:
                    "3. If you determine that you cannot use the tickets prior to an event, you must return the tickets to STAR."
            },
            {
                id:5,
                sub_header:"REMEMBER!",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "<li>If you give away event tickets to a client/ business associate and do not accompany him to the event in question, it is considered to be a gift</li>"+
                    "</br>" +
                    "<li>In case you host a client and his family at an event, the ticket used for the client is considered under entertainment but the tickets to his family members is considered to be a gift. Under exceptional circumstances, the ticket to the client’s spouse may be considered entertainment</li>"+
                    "</ul>"
            },
            {
                id:6,
                sub_header:"REMEMBER!",
                sub_contents:
                    "<ul style='text-align: left'>" +
                    "<li>In the case of complimentary tickets, the value stated on the tickets must be specified. If no value is stated on the tickets, then the value of the highest priced ticket for the sporting event must be considered.</li>"+
                    "</br>" +
                    "<li>In the event of tickets given as gifts, it is mandatory to include Instructions (as mentioned in the guidelines) for use of Star provided tickets</li>" +
                    "</ul>"
            }
        ]
    }
]