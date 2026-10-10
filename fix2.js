const fs = require('fs');
let c = fs.readFileSync('js/core/engine.js', 'utf8');
let lines = c.split('\n');
let newLines = [
    '            else if (r < 0.3) {',
    '                if (g.relations && g.relations.mafia >= 80 && !g.rivalDefeated) {',
    '                    g.marketShare += 2.0; Engine.addLog(?? Mafya rakibin deposunu kundaklad?! Pazar pay?n artt?.);',
    '                } else if (!g.relations || g.relations.mafia < 50) {',
    '                    if((g.staff.guard||0) === 0) {',
    '                        let loss = Math.floor(g.money * 0.1) + 100; if(g.money<loss)loss=g.money;',
    '                        Engine.spendMoney(loss); Engine.addLog(?? Marketten H?rs?zl?k Yap?ld?! Zarar: -);',
    '                    } else {',
    '                        let fine = 500 * g.staff.guard;',
    '                        Engine.earnMoney(fine); revenue += fine;',
    '                        Engine.addLog(?? G?venlik G?revlisi h?rs?z? su??st? yakalad?! Tazminat: <span class="green">+</span>);',
    '                    }',
    '                }',
    '            }'
];
lines.splice(443, 10, ...newLines);
fs.writeFileSync('js/core/engine.js', lines.join('\n'), 'utf8');
