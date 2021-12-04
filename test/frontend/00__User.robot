*** Settings ***
Library           Screenshot
Library           String
Library           SeleniumLibrary    timeout=10    run_on_failure=Capture Page Screenshot

Force Tags        User

Suite Setup       Open Browser    ${BASE_URL}
Suite Teardown    Close All Browsers

Test Setup        Go To    ${BASE_URL}


*** Variables ***
${ALERT_XPATH}        //div[contains(@class, 'alert')]
${USERNAME_XPATH}       //input[@name='username']
${PASSWORD_XPATH}       //input[@name='password']
${LOGIN_BTN_XPATH}      //button[text()='Login']
${REGISTER_LK_XPATH}    //a[@href="/register"]
${REGISTER_BTN_XPATH}   //button[text()='Register']
${ERROR_TEXTFIELD}      //div[@class="form-group has-error"]


*** Test Cases ***
Login with non-existing Account
    Input Text       ${USERNAME_XPATH}    fakeuser 
    Input Password   ${PASSWORD_XPATH}    fakepassword
    Click Button     ${LOGIN_BTN_XPATH}
    Element Should Contain    ${ALERT_XPATH}    Username or password is incorrect

Register Check Required Help Block
    Click Link       ${REGISTER_LK_XPATH}
    Click Button     ${REGISTER_BTN_XPATH}
    ${elements}=  Get WebElements   ${ERROR_TEXTFIELD}
    FOR    ${element}    IN    @{elements}
        ${result}=  Get Text    ${element} 
        @{lines}=   Split to Lines    ${result}
        Element Text Should Be    //div[@class="help-block" and text()='${lines}[1]']    ${lines}[0] is required
    END
    
Register With Test User Account
    Click Link       ${REGISTER_LK_XPATH}
    Input Text    firstName    Donald
    Input Text    lastName     Biden
    Input Text    email     donaldb@fakemail.com
    Input Text    username     donaldbiden
    Input Password    password     Maga2021!
    Click Element        dateOfBirth
    Press Keys    None    01012000
    Input Text    streetAddress     1600 Pennyyylvania Ave.
    Input Text    city    Washington
    Input Text    state   DC
    Input Text    country   USA
    Input Text    zipcode    20500
    Click Button     ${REGISTER_BTN_XPATH}
    Element Text Should Be    ${ALERT_XPATH}    Registration successful

    Input Text       ${USERNAME_XPATH}    donaldbiden 
    Input Password   ${PASSWORD_XPATH}    Maga2021!
    Click Button     ${LOGIN_BTN_XPATH}

    Page Should Contain    Passenger Name: Donald Biden