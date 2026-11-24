// Member area languages. The header language picker sets the language of the member area frame (menu, header,
// page titles) and of the profile questionnaires, which carry their own full translations for these 12 languages.
// Text inside the member area pages that has no translation here stays in English.

export const LANGS = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇧🇷" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "Chinese", native: "简体中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
];

const K = ["dashboard", "profile", "surveys", "rewards", "referrals", "notifications", "account", "help",
  "menu", "points", "quality", "memberArea", "memberId", "profilesComplete", "goProfile", "signOut",
  "light", "dark", "theme", "language", "appearance", "viewAll", "caughtUp", "newCount", "hcp", "caregiver", "patient", "messages"];

const T = {
  en: ["Dashboard", "My Profile", "Surveys", "Rewards", "Referrals", "Notifications", "My Account", "Help & Support",
    "Menu", "Points", "Quality", "Member area", "Member ID", "Profiles complete", "Go to my profile", "Sign out",
    "Light", "Dark", "Colour theme", "Language", "Appearance", "View all notifications", "You're all caught up", "new", "Healthcare Professionals", "Caregivers", "Patients", "Messages"],
  hi: ["डैशबोर्ड", "मेरी प्रोफ़ाइल", "सर्वे", "रिवॉर्ड्स", "रेफ़रल", "सूचनाएँ", "मेरा खाता", "सहायता",
    "मेनू", "पॉइंट्स", "क्वालिटी", "सदस्य क्षेत्र", "सदस्य आईडी", "पूरी प्रोफ़ाइल", "मेरी प्रोफ़ाइल पर जाएँ", "साइन आउट",
    "लाइट", "डार्क", "रंग थीम", "भाषा", "रूप", "सभी सूचनाएँ देखें", "कोई नई सूचना नहीं", "नई", "स्वास्थ्य पेशेवर", "देखभालकर्ता", "मरीज़", "संदेश"],
  es: ["Panel", "Mi perfil", "Encuestas", "Recompensas", "Referidos", "Notificaciones", "Mi cuenta", "Ayuda y soporte",
    "Menú", "Puntos", "Calidad", "Área de miembros", "ID de miembro", "Perfiles completos", "Ir a mi perfil", "Cerrar sesión",
    "Claro", "Oscuro", "Tema de color", "Idioma", "Apariencia", "Ver todas las notificaciones", "Estás al día", "nuevas", "Profesionales sanitarios", "Cuidadores", "Pacientes", "Mensajes"],
  fr: ["Tableau de bord", "Mon profil", "Enquêtes", "Récompenses", "Parrainages", "Notifications", "Mon compte", "Aide et assistance",
    "Menu", "Points", "Qualité", "Espace membre", "ID membre", "Profils complétés", "Aller à mon profil", "Se déconnecter",
    "Clair", "Sombre", "Thème de couleur", "Langue", "Apparence", "Voir toutes les notifications", "Vous êtes à jour", "nouvelles", "Professionnels de santé", "Aidants", "Patients", "Messages"],
  de: ["Übersicht", "Mein Profil", "Umfragen", "Prämien", "Empfehlungen", "Benachrichtigungen", "Mein Konto", "Hilfe & Support",
    "Menü", "Punkte", "Qualität", "Mitgliederbereich", "Mitglieds-ID", "Profile fertig", "Zu meinem Profil", "Abmelden",
    "Hell", "Dunkel", "Farbschema", "Sprache", "Darstellung", "Alle Benachrichtigungen", "Alles erledigt", "neu", "Gesundheitsfachkräfte", "Pflegende", "Patienten", "Nachrichten"],
  pt: ["Painel", "Meu perfil", "Pesquisas", "Recompensas", "Indicações", "Notificações", "Minha conta", "Ajuda e suporte",
    "Menu", "Pontos", "Qualidade", "Área do membro", "ID de membro", "Perfis completos", "Ir para meu perfil", "Sair",
    "Claro", "Escuro", "Tema de cores", "Idioma", "Aparência", "Ver todas as notificações", "Tudo em dia", "novas", "Profissionais de saúde", "Cuidadores", "Pacientes", "Mensagens"],
  it: ["Dashboard", "Il mio profilo", "Sondaggi", "Premi", "Inviti", "Notifiche", "Il mio account", "Aiuto e supporto",
    "Menu", "Punti", "Qualità", "Area membri", "ID membro", "Profili completati", "Vai al mio profilo", "Esci",
    "Chiaro", "Scuro", "Tema colore", "Lingua", "Aspetto", "Vedi tutte le notifiche", "Sei in pari", "nuove", "Professionisti sanitari", "Caregiver", "Pazienti", "Messaggi"],
  ar: ["لوحة التحكم", "ملفي الشخصي", "الاستطلاعات", "المكافآت", "الإحالات", "الإشعارات", "حسابي", "المساعدة والدعم",
    "القائمة", "النقاط", "الجودة", "منطقة الأعضاء", "رقم العضوية", "الملفات المكتملة", "انتقل إلى ملفي", "تسجيل الخروج",
    "فاتح", "داكن", "سمة الألوان", "اللغة", "المظهر", "عرض كل الإشعارات", "لا جديد", "جديدة", "المهنيون الصحيون", "مقدمو الرعاية", "المرضى", "الرسائل"],
  zh: ["仪表板", "我的资料", "调查", "奖励", "推荐", "通知", "我的账户", "帮助与支持",
    "菜单", "积分", "质量", "会员区", "会员编号", "已完成资料", "前往我的资料", "退出登录",
    "浅色", "深色", "颜色主题", "语言", "外观", "查看全部通知", "已全部查看", "条新", "医疗专业人员", "护理人员", "患者", "消息"],
  ja: ["ダッシュボード", "マイプロフィール", "アンケート", "リワード", "紹介", "お知らせ", "マイアカウント", "ヘルプとサポート",
    "メニュー", "ポイント", "品質", "会員エリア", "会員ID", "完了したプロフィール", "プロフィールへ", "ログアウト",
    "ライト", "ダーク", "カラーテーマ", "言語", "表示", "すべてのお知らせ", "新しいお知らせはありません", "件", "医療従事者", "介護者", "患者", "メッセージ"],
  ko: ["대시보드", "내 프로필", "설문조사", "리워드", "추천", "알림", "내 계정", "도움말 및 지원",
    "메뉴", "포인트", "품질", "회원 영역", "회원 ID", "완료한 프로필", "내 프로필로", "로그아웃",
    "라이트", "다크", "색상 테마", "언어", "화면", "모든 알림 보기", "새 알림이 없습니다", "개", "보건의료 전문가", "보호자", "환자", "메시지"],
  ru: ["Главная", "Мой профиль", "Опросы", "Награды", "Рефералы", "Уведомления", "Мой аккаунт", "Помощь",
    "Меню", "Баллы", "Качество", "Кабинет участника", "ID участника", "Заполнено профилей", "К моему профилю", "Выйти",
    "Светлая", "Тёмная", "Цветовая тема", "Язык", "Оформление", "Все уведомления", "Новых уведомлений нет", "новых", "Медработники", "Опекуны", "Пациенты", "Сообщения"],
};

const DICT = Object.fromEntries(Object.entries(T).map(([code, list]) => [code, Object.fromEntries(K.map((k, i) => [k, list[i]]))]));

/** t(lang)("surveys") → the member area string in that language, English when it has no translation. */
export const tr = (lang) => (key) => (DICT[lang] && DICT[lang][key]) || DICT.en[key] || key;

export const langOf = (code) => LANGS.find((l) => l.code === code) || LANGS[0];
