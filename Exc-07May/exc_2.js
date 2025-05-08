function member(id, name, role, matchingId, mismatchingId)
{
    this.id = id;
    this.name = name;
    this.role = role;
}

function combination(mainMember, coreMember, benchMember)
{
    this.mainMember = mainMember;
    this.coreMember = coreMember;
    this.benchMember = benchMember;
}

function pair(firstMemberId, secondMemberId)
{
    this.firstMemberId = firstMemberId;
    this.secondMemberId = secondMemberId;
}

function findAllCombination(memberList,matchingPairs, mismatchingPairs)
{
    let result = [];
    
    //Đọc toàn bộ các thành viên main, core và bench
    const mainMembers = memberList.filter(member => member.role === 'main');
    const coreMembers = memberList.filter(member => member.role === 'core');
    const benchMembers = memberList.filter(member => member.role === 'bench');

    for(let i = 0; i < mainMembers.length; i++)
    {
        for(let j = 0; j < coreMembers.length; j++)
        {
            for(let k = 0; k < benchMembers.length; k++)
            {

                let newCombination = new combination(mainMembers[i], coreMembers[j], benchMembers[k]);

                //Combination valid thì push vào result
                if(isValdCombination(newCombination, matchingPairs, mismatchingPairs))
                {
                    result.push(newCombination);
                }
                
            }
        }
    }
    return result;
}

//Hàm check valid combination
function isValdCombination(combination, matchingPairs, mismatchingPairs){
    let pair1 = new pair (combination.mainMember.id, combination.coreMember.id);
    let pair2 = new pair (combination.mainMember.id, combination.benchMember.id);
    let pair3 = new pair (combination.coreMember.id, combination.benchMember.id);

    //Nếu có bất kỳ cặp nào trong 3 cặp là cặp không hợp lệ thì return false
    if(isPairInList(pair1, mismatchingPairs) || isPairInList(pair2, mismatchingPairs) || isPairInList(pair3, mismatchingPairs))
    {
        return false;
    }

    //Nếu có bất kỳ cặp nào trong 3 cặp là cặp hợp lệ thì return true
    if(isPairInList(pair1, matchingPairs) || isPairInList(pair2, matchingPairs) || isPairInList(pair3, matchingPairs))
    {
        return true;
    }
   
    //Nếu không tồn tại trong cả 2 list thì return false
    return false;
}

function isPairInList(pair, pairList) {
    //Kiểm tra pair có tồn tại trong list hay không, dù xuôi hay ngược
    return pairList.some(p => 
        (p.firstMemberId === pair.firstMemberId && p.secondMemberId === pair.secondMemberId) ||
        (p.firstMemberId === pair.secondMemberId && p.secondMemberId === pair.firstMemberId)
    );
}

function displayMemberList(memberList)
{
    for(let i = 0; i < memberList.length; i++)
    {
        console.log(`ID: ${memberList[i].id}, Name: ${memberList[i].name}, Role: ${memberList[i].role}, MatchingId: ${memberList[i].matchingId}, MismatchingId: ${memberList[i].mismatchingId}`);
    }
}

function displayCombinationList(combinationList)
{
    for(let i = 0; i < combinationList.length; i++)
    {
        console.log(`Main Member: ${combinationList[i].mainMember.name}, Core Member: ${combinationList[i].coreMember.name}, Bench Member: ${combinationList[i].benchMember.name}`);
    }
}   

function saveMemberListToJSON(memberList, fileName)
{
    const fs = require('fs');
    fs.writeFileSync(fileName, JSON.stringify(memberList, null, 2));
}

function loadMemberListFromJSON(fileName)
{
    const fs = require('fs');
    if (!fs.existsSync(fileName)) {
        console.log(`File ${fileName} does not exist.`);
        return [];
    }
    let data = fs.readFileSync(fileName);
    let memberList = JSON.parse(data);
    return memberList;
}

function addPairToList(pairList, firstMemberId, secondMemberId)
{
    let newPair = new pair(firstMemberId, secondMemberId);
    pairList.push(newPair);
}

function deletePairFromList(pairList, firstMemberId, secondMemberId)
{
    let index = pairList.findIndex(pair => 
        (pair.firstMemberId === firstMemberId && pair.secondMemberId === secondMemberId) ||
        (pair.firstMemberId === secondMemberId && pair.secondMemberId === firstMemberId)
    );
    if (index !== -1) {
        pairList.splice(index, 1);
    } else {
        console.log("Pair not found.");
    }
}

function checkCombination(memberId1, memberId2, memberId3, memberList, matchingPairs, mismatchingPairs)
{
    const members = [memberId1, memberId2, memberId3].map(id => memberList.find(member => member.id === id));

    if (members.some(member => !member)) {
        return false; 
    }

    const roles = members.map(member => member.role);
    const uniqueRole = new Set(roles);
    if(!uniqueRole.has('main') || !uniqueRole.has('core') || !uniqueRole.has('bench'))
    {
        return false;
    }

    const mainMember = members.find(member => member.role === 'main');
    const coreMember = members.find(member => member.role === 'core');
    const benchMember = members.find(member => member.role === 'bench');

    let newCombination = new combination(mainMember, coreMember, benchMember);

    // Check if the combination is valid
    if (isValdCombination(newCombination, matchingPairs, mismatchingPairs)) {
        return true;
    } else {
        return false;
    }
}


let memberList = [];

let matchingPairs = [];
let mismatchingPairs = [];

addPairToList(matchingPairs, 2, 16);
addPairToList(matchingPairs, 3, 17);
addPairToList(matchingPairs, 3, 8);
addPairToList(matchingPairs, 3, 9);

addPairToList(mismatchingPairs, 2, 5);
addPairToList(mismatchingPairs, 2, 7);
addPairToList(mismatchingPairs, 14, 5);
addPairToList(mismatchingPairs, 8, 6);


const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });


async function handleMenu() {

    let memberList = loadMemberListFromJSON("members.json");
    let isRunning = true;

    console.log("Matching Pairs: ");
    for (let i = 0; i < matchingPairs.length; i++) {
        console.log(`${matchingPairs[i].firstMemberId} - ${matchingPairs[i].secondMemberId}`);
    }

    console.log("Mismatching Pairs: ");
    for (let i = 0; i < mismatchingPairs.length; i++) {
        console.log(`${mismatchingPairs[i].firstMemberId} - ${mismatchingPairs[i].secondMemberId}`);
    }

    console.log("\n1. Display Member List (40 members)");
    console.log("2. Add Matching Pair");
    console.log("3. Add Mismatching Pair");
    console.log("4. Delete Matching Pair");
    console.log("5. Delete Mismatching Pair");
    console.log("6. Display all possible team combinations");
    console.log("7. Check combination of 3 members");
    console.log("8. Exit");

    while (isRunning) {

        const choice = await rl.question('Enter your choice: ');

        switch (choice.trim()) {
            case '1':
                displayMemberList(memberList);
                break;
            case '2':
                const firstMemberId = parseInt(await rl.question('Enter first member ID: '), 10);
                const secondMemberId = parseInt(await rl.question('Enter second member ID: '), 10);
                addPairToList(matchingPairs, firstMemberId, secondMemberId);
                console.log("Matching pair added successfully!");
                break;
            case '3':
                const firstMismatchingId = parseInt(await rl.question('Enter first member ID: '), 10);
                const secondMismatchingId = parseInt(await rl.question('Enter second member ID: '), 10);
                addPairToList(mismatchingPairs, firstMismatchingId, secondMismatchingId);
                console.log("Mismatching pair added successfully!");
                break;
            case '4':
                const firstDeleteId = parseInt(await rl.question('Enter first member ID: '), 10);
                const secondDeleteId = parseInt(await rl.question('Enter second member ID: '), 10);
                deletePairFromList(matchingPairs, firstDeleteId, secondDeleteId);
                console.log("Matching pair deleted successfully!");
                break;
            case '5':
                const firstDeleteMismatchingId = parseInt(await rl.question('Enter first member ID: '), 10);
                const secondDeleteMismatchingId = parseInt(await rl.question('Enter second member ID: '), 10);
                deletePairFromList(mismatchingPairs, firstDeleteMismatchingId, secondDeleteMismatchingId);
                console.log("Mismatching pair deleted successfully!");
                break;
            case '6':
                let combinationList = findAllCombination(memberList, matchingPairs, mismatchingPairs);
                console.log("All combinations of members: " + combinationList.length);
                displayCombinationList(combinationList);
                break;
            case '7':
                const memberId1 = parseInt(await rl.question('Enter first member ID: '), 10);
                const memberId2 = parseInt(await rl.question('Enter second member ID: '), 10);
                const memberId3 = parseInt(await rl.question('Enter third member ID: '), 10);
                if (checkCombination(memberId1, memberId2, memberId3, memberList, matchingPairs, mismatchingPairs)) {
                    console.log("The combination is valid.");
                } else {
                    console.log("The combination is not valid.");
                }
                break;
            case '8':
                isRunning = false;
                console.log("Exiting...");
                break;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }

    rl.close();
}
handleMenu();



