*** Settings ***
Library           Screenshot
Library           String
Library           SeleniumLibrary    timeout=10    run_on_failure=Capture Page Screenshot

Force Tags        FlightSearch

Suite Setup       Run Keywords    Open Browser    ${BASE_URL}
...               AND    Login as Donald
Suite Teardown    Close All Browsers

Test Setup        Go To    ${BASE_URL}flight_search

*** Variables ***
${ALERT_XPATH}        //div[contains(@class, 'alert')]
${USERNAME_XPATH}       //input[@name='username']
${PASSWORD_XPATH}       //input[@name='password']
${LOGIN_BTN_XPATH}      //button[text()='Login']
${ERROR_TEXTFIELD}      //div[@class="form-group has-error"]
${RD_TRIP_BTN_XPATH}    //button[@name="round trip"]
${ONE_WAY_BTN_XPATH}    //button[@name="one way"]


*** Keywords ***
Login as Donald
    Input Text       ${USERNAME_XPATH}    donaldbiden 
    Input Password   ${PASSWORD_XPATH}    Maga2021!
    Click Button     ${LOGIN_BTN_XPATH}

**** Test Cases ***
Check Flight Search Route Switch
    Page Should Not Contain    Return Date
    Click Button    ${RD_TRIP_BTN_XPATH} 
    Page Should Contain    Return Date
    Click Button    ${ONE_WAY_BTN_XPATH}
    Page Should Not Contain    Return Date

Search One Way Flight
    Input Text    departAirport    JFK
    Input Text    arrivalAirport    SJC
    Click Element        departDate
    Press Keys    None    08302021
    Click Button    Search

    Page Should Contain    F0034
    Page Should Contain    F0035

    Page Should Contain Button    Book


Search Round Trip Flight
    Click Button    ${RD_TRIP_BTN_XPATH} 
    
    Input Text    departAirport    JFK
    Input Text    arrivalAirport    SJC
    Press Keys    None    TAB
    # Click Element        departDate
    Press Keys    None    08302021
    Press Keys    None    TAB
    # Click Element        returnDate
    Press Keys    None    09052021
    Click Button    Search
    Page Should Contain    F0034
    Page Should Contain    F0035
    
    Page Should Contain    Returning Flights
    Page Should Contain    F0036

    Page Should Contain Button    Book

Select Flight
    Click Button    ${RD_TRIP_BTN_XPATH} 
    
    Input Text    departAirport    JFK
    Input Text    arrivalAirport    SJC
    Press Keys    None    TAB
    # Click Element        departDate
    Press Keys    None    08302021
    Press Keys    None    TAB
    # Click Element        returnDate
    Press Keys    None    09052021
    Click Button    Search

    Click Element    //input[@name="departGroup" and @value="F0035@2021-08-30"]/following-sibling::label
    Click Element    //input[@name="returnGroup" and @value="F0036@2021-09-05"]/following-sibling::label

    Click Button    Book