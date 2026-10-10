const fs = require('fs');
let content = fs.readFileSync('js/core/engine.js', 'utf8');

const targetStr =                 if((g.staff.guard||0) === 0) { 
                    let loss = Math.floor(g.money * 0.1) + 100; if(g.money<loss)loss=g.money; 
                    Engine.spendMoney(loss); Engine.addLog(\🦹 Marketten Hırsızlık Yapıldı! Zarar: -\\); 
                } else {
                    let fine = 500 * g.staff.guard;
                    Engine.earnMoney(fine); revenue += fine;
                    Engine.addLog(\👮 Güvenlik Görevlisi hırsızı suçüstü yakaladı! Tazminat: <span class="green">+\</span>\);
                };

const replacementStr =                 if (g.relations && g.relations.mafia >= 80 && !g.rivalDefeated) {
                    g.marketShare += 2.0; Engine.addLog(\🔥 Mafya rakibin deposunu kundakladı! Pazar payın arttı.\);
                } else if (!g.relations || g.relations.mafia < 50) {
                    if((g.staff.guard||0) === 0) { 
                        let loss = Math.floor(g.money * 0.1) + 100; if(g.money<loss)loss=g.money; 
                        Engine.spendMoney(loss); Engine.addLog(\🦹 Marketten Hırsızlık Yapıldı! Zarar: -\\); 
                    } else {
                        let fine = 500 * g.staff.guard;
                        Engine.earnMoney(fine); revenue += fine;
                        Engine.addLog(\👮 Güvenlik Görevlisi hırsızı suçüstü yakaladı! Tazminat: <span class="green">+\</span>\);
                    }
                };

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('js/core/engine.js', content, 'utf8');
