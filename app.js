// Point this string straight to your backend processing URL server instance
const DETECTION_API_BASE_URL = "http://127.0.0.1:5000"; 

// --- ACCOUNT DATABASE ---
const accountsDatabase = [
    { name: 'user1', handle: '@user1', age: '2 years', followers: '5,420', following: '1,230', posts: '342', classification: 'Genuine', score: 12, riskLevel: 'Low Risk', behaviorScore: 10, networkScore: 12, contentScore: 18, trendScore: 6, summary: ['Consistent content quality', 'Genuine community engagement', 'Real follower base'] },
    { name: 'user2', handle: '@user2', age: '1.5 years', followers: '3,200', following: '856', posts: '278', classification: 'Genuine', score: 18, riskLevel: 'Low Risk', behaviorScore: 14, networkScore: 18, contentScore: 22, trendScore: 8, summary: ['Steady posting schedule', 'High engagement rate', 'Verified followers'] },
    { name: 'user3', handle: '@user3', age: '1 year', followers: '8,900', following: '2,145', posts: '456', classification: 'Genuine', score: 15, riskLevel: 'Low Risk', behaviorScore: 12, networkScore: 14, contentScore: 16, trendScore: 7, summary: ['Consistent content quality', 'Genuine community engagement', 'Real follower base'] },
    { name: 'user4', handle: '@user4', age: '3 months', followers: '85,000', following: '45', posts: '2,500', classification: 'Fake', score: 92, riskLevel: 'High Risk', behaviorScore: 95, networkScore: 88, contentScore: 90, trendScore: 85, summary: ['Unnatural growth pattern', 'Suspicious engagement metrics', 'Bot-like behavior detected'] },
    { name: 'user5', handle: '@user5', age: '2 months', followers: '1,20,000', following: '32', posts: '5,600', classification: 'Fake', score: 95, riskLevel: 'High Risk', behaviorScore: 98, networkScore: 92, contentScore: 95, trendScore: 90, summary: ['Extreme follower inflation', 'Minimal genuine interaction', 'Automated content patterns'] },
    { name: 'user6', handle: '@user6', age: '1 month', followers: '45,000', following: '28', posts: '8,900', classification: 'Fake', score: 88, riskLevel: 'High Risk', behaviorScore: 92, networkScore: 85, contentScore: 88, trendScore: 80, summary: ['Rapid account growth', 'Inauthentic followers', 'Spam-like posting behavior'] },
    { name: 'user7', handle: '@user7', age: '6 months', followers: '25,000', following: '3,450', posts: '450', classification: 'Suspicious', score: 58, riskLevel: 'Medium Risk', behaviorScore: 55, networkScore: 60, contentScore: 58, trendScore: 50, summary: ['Questionable engagement patterns', 'Moderate anomalies detected', 'Monitor for changes'] },
    { name: 'user8', handle: '@user8', age: '4 months', followers: '35,000', following: '2,890', posts: '2,200', classification: 'Suspicious', score: 62, riskLevel: 'Medium Risk', behaviorScore: 64, networkScore: 60, contentScore: 62, trendScore: 56, summary: ['Irregular activity patterns', 'Mixed engagement signals', 'Requires further investigation'] },
    { name: 'user9', handle: '@user9', age: '1 month', followers: '15,000', following: '22', posts: '3,200', classification: 'Fake', score: 85, riskLevel: 'High Risk', behaviorScore: 88, networkScore: 82, contentScore: 85, trendScore: 78, summary: ['Artificial follower acquisition', 'Suspicious posting frequency', 'No authentic interactions'] },
    { name: 'user10', handle: '@user10', age: '3 weeks', followers: '50,000', following: '15', posts: '4,500', classification: 'Fake', score: 93, riskLevel: 'High Risk', behaviorScore: 96, networkScore: 90, contentScore: 92, trendScore: 88, summary: ['Extremely new account with massive followers', 'Classic bot signature patterns', 'Immediate removal recommended'] },
    { name: 'user11', handle: '@user11', age: '8 months', followers: '12,000', following: '1,567', posts: '580', classification: 'Genuine', score: 22, riskLevel: 'Low Risk', behaviorScore: 20, networkScore: 22, contentScore: 24, trendScore: 18, summary: ['Balanced follower-following ratio', 'Authentic engagement', 'No suspicious indicators'] },
    { name: 'user12', handle: '@user12', age: '6 weeks', followers: '28,000', following: '35', posts: '3,800', classification: 'Fake', score: 78, riskLevel: 'High Risk', behaviorScore: 82, networkScore: 76, contentScore: 78, trendScore: 72, summary: ['Unnatural growth acceleration', 'Low quality content', 'Engagement farming detected'] },
    { name: 'user13', handle: '@user13', age: '9 months', followers: '18,500', following: '4,230', posts: '925', classification: 'Genuine', score: 20, riskLevel: 'Low Risk', behaviorScore: 18, networkScore: 20, contentScore: 22, trendScore: 16, summary: ['Stable account growth', 'Quality content focus', 'Strong community interaction'] }
];
 

// --- SINGLE-PAGE NAVIGATION ACTION HANDLER ---
const allButtons = document.querySelectorAll('.nav-btn, .side-btn');
const panels = document.querySelectorAll('.view-panel');

allButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        // Toggle active panels
        panels.forEach(p => {
            if(p.id === targetId) {
                p.classList.remove('hidden-view');
                p.classList.add('active-view');
            } else {
                p.classList.remove('active-view');
                p.classList.add('hidden-view');
            }
        });

        // Update active class styles matching both link rows elements
        allButtons.forEach(b => {
            if(b.getAttribute('data-target') === targetId) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    });
});

// --- SINGLE ACCOUNT EVALUATION MODEL TRIGGER ---
const resultBox = document.getElementById('single-result-box');
const detailPanel = document.getElementById('account-detail-panel');
const analysisSearchBtn = document.querySelector('.analysis-search-btn');

const performAccountSearch = () => {
    const usernameInput = document.getElementById('username');
    if(!usernameInput) return;

    const searchQuery = usernameInput.value.toLowerCase().trim();
    const foundAccount = accountsDatabase.find(acc => 
        acc.handle.toLowerCase() === searchQuery || 
        acc.name.toLowerCase() === searchQuery
    );

    if(foundAccount) {
        // Show detail panel, hide default result box
        resultBox.style.display = "none";
        detailPanel.style.display = "block";

        // Update detail panel with account info
        document.getElementById('detail-username').textContent = foundAccount.name;
        document.getElementById('detail-handle').textContent = foundAccount.handle;
        document.getElementById('detail-age').textContent = foundAccount.age;
        document.getElementById('detail-followers').textContent = foundAccount.followers;
        document.getElementById('detail-following').textContent = foundAccount.following;
        document.getElementById('detail-posts').textContent = foundAccount.posts;
        document.getElementById('detail-score-value').textContent = foundAccount.score;
        document.getElementById('detail-behavior-score').textContent = foundAccount.behaviorScore + '%';
        document.getElementById('detail-network-score').textContent = foundAccount.networkScore + '%';
        document.getElementById('detail-content-score').textContent = foundAccount.contentScore + '%';
        document.getElementById('detail-trend-score').textContent = foundAccount.trendScore + '%';

        // Update progress bars with appropriate colors
        const scoreBar = document.getElementById('detail-score-bar');
        const behaviorBar = document.getElementById('detail-behavior-bar');
        const networkBar = document.getElementById('detail-network-bar');
        const contentBar = document.getElementById('detail-content-bar');
        const trendBar = document.getElementById('detail-trend-bar');

        scoreBar.style.width = foundAccount.score + '%';
        behaviorBar.style.width = foundAccount.behaviorScore + '%';
        networkBar.style.width = foundAccount.networkScore + '%';
        contentBar.style.width = foundAccount.contentScore + '%';
        trendBar.style.width = foundAccount.trendScore + '%';

        // Set bar colors based on score
        const setBarColor = (bar, score) => {
            if(score <= 30) {
                bar.style.background = 'linear-gradient(90deg, #16a34a, #22c55e)'; // Green
            } else if(score <= 60) {
                bar.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)'; // Orange/Yellow
            } else {
                bar.style.background = 'linear-gradient(90deg, #dc2626, #ef4444)'; // Red
            }
        };

        setBarColor(scoreBar, foundAccount.score);
        setBarColor(behaviorBar, foundAccount.behaviorScore);
        setBarColor(networkBar, foundAccount.networkScore);
        setBarColor(contentBar, foundAccount.contentScore);
        setBarColor(trendBar, foundAccount.trendScore);

        // Update classification badge
        const classificationEl = document.getElementById('detail-classification');
        if(classificationEl) {
            classificationEl.className = 'badge';
            if(foundAccount.classification === 'Genuine') {
                classificationEl.classList.add('badge-genuine');
            } else if(foundAccount.classification === 'Fake') {
                classificationEl.classList.add('badge-fake');
            } else {
                classificationEl.classList.add('badge-suspicious');
            }
            classificationEl.textContent = foundAccount.classification;
        }

        // Update risk level
        const riskEl = document.getElementById('detail-risk-level');
        riskEl.className = '';
        if(foundAccount.riskLevel === 'Low Risk') {
            riskEl.classList.add('risk-low-text');
        } else if(foundAccount.riskLevel === 'High Risk') {
            riskEl.classList.add('risk-high-text');
        } else {
            riskEl.classList.add('risk-med-text');
        }
        riskEl.textContent = foundAccount.riskLevel;

        // Update summary
        const summaryList = document.getElementById('detail-summary');
        summaryList.innerHTML = foundAccount.summary.map(item => `<li>${item}</li>`).join('');
    } else {
        // Account not found
        resultBox.style.display = "block";
        detailPanel.style.display = "none";
        resultBox.style.backgroundColor = "#fef2f2";
        resultBox.style.color = "#991b1b";
        resultBox.innerHTML = `<div class='status-content'><p>❌ <strong>Account Not Found:</strong> No matching account in the system.</p></div>`;
    }
};

if(analysisSearchBtn) {
    analysisSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performAccountSearch();
    });
}

const usernameInputField = document.getElementById('username');
if(usernameInputField) {
    usernameInputField.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            performAccountSearch();
        }
    });
}

// --- BATCH PARSING CSV FILE DATA STREAM DATASET ---
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('csv-file-picker');
const csvUploadStatus = document.getElementById('csv-upload-status');
const csvResultsSection = document.getElementById('csv-results-section');
const csvResultsCount = document.getElementById('csv-results-count');
const csvResultsBody = document.getElementById('csv-results-body');

const classifyScore = score => {
    if(score >= 65) return { label: 'Fake', badgeClass: 'badge-fake', riskClass: 'risk-high-text' };
    if(score >= 40) return { label: 'Suspicious', badgeClass: 'badge-suspicious', riskClass: 'risk-med-text' };
    return { label: 'Genuine', badgeClass: 'badge-genuine', riskClass: 'risk-low-text' };
};

const parseAgeToMonths = ageText => {
    const value = (ageText || '').toLowerCase().trim();
    const years = value.match(/([\d.]+)\s*year/);
    if(years) return Math.round(parseFloat(years[1]) * 12);
    const months = value.match(/([\d.]+)\s*month/);
    if(months) return Math.round(parseFloat(months[1]));
    const weeks = value.match(/([\d.]+)\s*week/);
    if(weeks) return Math.max(1, Math.round(parseFloat(weeks[1]) / 4));
    const numberOnly = value.match(/^\d+(?:\.\d+)?$/);
    if(numberOnly) {
        const numeric = parseFloat(numberOnly[0]);
        return numeric > 120 ? Math.round(numeric / 30) : Math.round(numeric);
    }
    return 0;
};

const parseCsvText = text => {
    const rows = text.trim().split(/\r?\n/).map(row => row.split(',').map(cell => cell.trim()));
    const cleaned = rows.filter(row => row.some(cell => cell !== ''));
    if(cleaned.length && cleaned[0][0].toLowerCase().includes('username')) {
        cleaned.shift();
    }
    return cleaned.filter(row => row.length >= 5).map(row => row.slice(0, 5));
};

const calculateSuspicionScore = ({ followers, following, posts, accountAge }) => {
    const followersNum = Number((followers || '').replace(/[^\d]/g, '')) || 0;
    const followingNum = Number((following || '').replace(/[^\d]/g, '')) || 0;
    const postsNum = Number((posts || '').replace(/[^\d]/g, '')) || 0;
    const ageMonths = Math.max(0, parseAgeToMonths(accountAge));
    const ratio = followingNum > 0 ? followersNum / followingNum : followersNum > 0 ? 99 : 1;

    let score = 0;
    if(ageMonths <= 1) score += 28;
    else if(ageMonths <= 3) score += 22;
    else if(ageMonths <= 6) score += 16;
    else if(ageMonths <= 12) score += 10;
    else if(ageMonths <= 24) score += 6;
    else score += 2;

    if(followersNum >= 200000) score += 28;
    else if(followersNum >= 100000) score += 22;
    else if(followersNum >= 50000) score += 16;
    else if(followersNum >= 20000) score += 10;
    else if(followersNum >= 5000) score += 6;
    else score += 2;

    if(ratio >= 100) score += 24;
    else if(ratio >= 50) score += 18;
    else if(ratio >= 25) score += 14;
    else if(ratio >= 10) score += 8;
    else score += 2;

    if(followingNum <= 20) score += 24;
    else if(followingNum <= 50) score += 18;
    else if(followingNum <= 100) score += 12;
    else if(followingNum <= 300) score += 6;
    else score += 2;

    if(postsNum <= 10) score += 18;
    else if(postsNum <= 50) score += 14;
    else if(postsNum <= 200) score += 10;
    else if(postsNum <= 1000) score += 6;
    else score += 2;

    if(followersNum > 25000 && postsNum < 100) score += 18;
    if(ageMonths <= 6 && followersNum >= 50000 && ratio >= 40) score += 20;
    if(ageMonths > 12 && followersNum < 1500 && ratio < 10) score -= 16;
    if(ageMonths > 24 && followersNum > 120000 && ratio < 15) score += 12;
    if(ageMonths === 0) score += 10;

    score += Math.round((Math.random() * 12) - 6);
    score = Math.min(99, Math.max(1, Math.round(score)));
    return score;
};

const renderCsvResults = results => {
    csvResultsBody.innerHTML = results.map(item => {
        const classification = classifyScore(item.suspicionScore);
        return `
            <tr>
                <td><strong>${item.username}</strong></td>
                <td>${item.accountAge}</td>
                <td>${item.followers}</td>
                <td>${item.following}</td>
                <td>${item.posts}</td>
                <td><span class="badge ${classification.badgeClass}">${classification.label}</span></td>
                <td><span class="${classification.badgeClass} score-fake">${item.suspicionScore}%</span></td>
                <td><span class="${classification.riskClass}">${classification.label === 'Fake' ? 'High Risk' : classification.label === 'Suspicious' ? 'Medium Risk' : 'Low Risk'}</span></td>
            </tr>
        `;
    }).join('');
};

if(dropZone && fileInput && csvUploadStatus && csvResultsSection && csvResultsCount && csvResultsBody) {
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => {
        e.preventDefault();
        dropZone.classList.add('dragging');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'));
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('dragging');
        const file = e.dataTransfer.files[0];
        if(file && file.type === 'text/csv') {
            fileInput.files = e.dataTransfer.files;
            handleCsvFile(file);
        }
    });

    const handleCsvFile = file => {
        csvUploadStatus.textContent = `Parsing CSV file: ${file.name}...`;
        const reader = new FileReader();
        reader.onload = () => {
            const rows = parseCsvText(reader.result);
            if(rows.length === 0) {
                csvUploadStatus.textContent = 'CSV file could not be parsed. Please check the format.';
                return;
            }

            const results = rows.map(row => {
                const [username, followers, following, posts, accountAge] = row;
                const suspicionScore = calculateSuspicionScore({ followers, following, posts, accountAge });
                return { username, followers, following, posts, accountAge, suspicionScore };
            });

            csvResultsCount.textContent = results.length;
            renderCsvResults(results);
            csvResultsSection.classList.remove('hidden-panel');
            csvUploadStatus.textContent = `Loaded ${results.length} accounts. Scroll down for the analysis table.`;
        };
        reader.readAsText(file);
    };

    fileInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if(file) {
            handleCsvFile(file);
        }
    });
}

// Add a little style for drag state if element exists
if(dropZone) {
    dropZone.addEventListener('dragend', () => dropZone.classList.remove('dragging'));
}
// --- SECTION 4: TIMELINE FILTER BUTTON TOGGLE CONTROLLER ---
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Remove the active color class from whichever button currently has it
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // 2. Add the active color class to the specific button you just clicked
        button.classList.add('active');
    });
});

// --- SECTION 5: ALL ACCOUNTS TABLE TOGGLE CONTROLLER ---
const toggleAccountsBtn = document.getElementById('toggle-accounts-btn');
const accountsTable = document.getElementById('accounts-table');

if(toggleAccountsBtn && accountsTable) {
    toggleAccountsBtn.addEventListener('click', () => {
        // Toggle visibility of the table
        accountsTable.classList.toggle('hidden-table');
        
        // Toggle button text
        if(accountsTable.classList.contains('hidden-table')) {
            toggleAccountsBtn.textContent = 'Show Account Details';
        } else {
            toggleAccountsBtn.textContent = 'Hide Account Details';
        }
    });
}

// --- SECTION 6: MAKE HINT LINKS CLICKABLE ---
const hintLinks = document.querySelectorAll('.analysis-hints-row a');
const usernameInput = document.getElementById('username');

hintLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const username = link.textContent.trim();
        if(usernameInput) {
            usernameInput.value = username;
            // Trigger search
            const searchBtn = document.querySelector('.analysis-search-btn');
            if(searchBtn) {
                searchBtn.click();
            }
        }
    });
});