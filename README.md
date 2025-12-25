# Jas_PW-project
</br>
this is my PW folder</br>
Try commit again</br>
Now I will try git push origin main which seems to be similar to sync

Locators:
ID Present:
css -> tagname#id or #id

css present:
css -> tagname.class or .class

other attribute present:
css -> [attribute* = 'value'] * is for partial values

from parent to child
css -> parenttagName >>childtagname

getByLabel
label is something written in <label>.....</label>
we can do click,check,select or other functions on the associated locator.
for entering(fill or type) the values getByLabel is not recommended.

page.getByLabel(employed).check()

getByRole
this is the options provide by playW when typing:
page.getByRole()
here we provide the role and name of the role, ex:
page.getByRole('button',{name:'Submit'})
page.getByLink('link',{name:'myaccount'})


getByAltText

getByPlaceholder
if the webPage have <placeholder> for the element, this locator can be used directly:
page.getByPlaceholder(password).fill("pass123")

getByText
this do function like click or isVisible()

getByTitle

getByTestId


---- for parallel or serial execution:

use Workers: <number>.. by default it is 5.
this starts the execution of 5 test files in parallel but the tests in the files will be sequential manners.

for execute the tests also in the files, use 
test.describe.configure({mode:'parallel'});

for excution of tests in a inter-dependent mode, use 
test.describe.configure({mode:'serial'});

tagging in test execution:
use tags like - @API to separate your testcases for execution. helpful for sanity, regression, testdata or similar
how to execute - npx playwright test --grep "@API"