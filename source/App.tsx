import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const questions = [
  { text: 'Ngày 30 tháng 4 là ngày giải phóng miền Nam, thống nhất đất nước.', answer: true },
  { text: 'Mặt trời mọc ở hướng tây', answer: false },
  { text: 'Hoàng Sa, Trường Sa là của Việt Nam', answer: true },
  { text: 'Ngày 1 tháng 4 là ngày cá tháng tư', answer: true },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<boolean[]>([]);
  const finished = index >= questions.length;

  const answerQuestion = (selected: boolean) => {
    if (finished) return;
    const correct = selected === questions[index].answer;
    if (correct) setScore(value => value + 1);
    setHistory(value => [...value, correct]);
    setIndex(value => value + 1);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setHistory([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#202437" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>QUICK KNOWLEDGE CHECK</Text>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Quizzler</Text>
            <View style={styles.scorePill}><Text style={styles.scoreText}>{score} / {questions.length}</Text></View>
          </View>
        </View>

        {!finished ? (
          <>
            <View style={styles.questionArea}>
              <Text style={styles.questionNumber}>QUESTION {index + 1} OF {questions.length}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${((index + 1) / questions.length) * 100}%` }]} />
              </View>
              <View style={styles.questionCard}>
                <Text style={styles.questionText}>{questions[index].text}</Text>
              </View>
            </View>
            <View style={styles.answerArea}>
              <Pressable accessibilityRole="button" onPress={() => answerQuestion(true)} style={({ pressed }) => [styles.answerButton, styles.trueButton, pressed && styles.pressed]}>
                <Text style={styles.answerButtonText}>TRUE</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={() => answerQuestion(false)} style={({ pressed }) => [styles.answerButton, styles.falseButton, pressed && styles.pressed]}>
                <Text style={styles.answerButtonText}>FALSE</Text>
              </Pressable>
              <View style={styles.historyRow}>
                {history.map((correct, position) => (
                  <View key={position} style={[styles.historyDot, { backgroundColor: correct ? '#42d392' : '#ff6c79' }]}>
                    <Text style={styles.historyMark}>{correct ? '✓' : '×'}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.resultCard}>
            <View style={styles.resultBadge}><Text style={styles.resultEmoji}>{score === questions.length ? '🎉' : '✓'}</Text></View>
            <Text style={styles.resultEyebrow}>QUIZ COMPLETE</Text>
            <Text style={styles.resultTitle}>{score} of {questions.length}</Text>
            <Text style={styles.resultText}>{score === questions.length ? 'Perfect score. Nicely done!' : 'Good work. Want another round?'}</Text>
            <View style={styles.historyRow}>
              {history.map((correct, position) => (
                <View key={position} style={[styles.historyDot, { backgroundColor: correct ? '#42d392' : '#ff6c79' }]}>
                  <Text style={styles.historyMark}>{correct ? '✓' : '×'}</Text>
                </View>
              ))}
            </View>
            <Pressable accessibilityRole="button" onPress={restart} style={({ pressed }) => [styles.restartButton, pressed && styles.pressed]}>
              <Text style={styles.restartText}>PLAY AGAIN</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#202437' },
  container: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 23, paddingTop: 24, paddingBottom: 26 },
  header: { gap: 9 },
  eyebrow: { color: '#929bb5', fontSize: 10, fontWeight: '700', letterSpacing: 2.4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: '#ffffff', fontSize: 34, fontWeight: '800' },
  scorePill: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#30364e' },
  scoreText: { color: '#c6cee0', fontSize: 14, fontWeight: '800' },
  questionArea: { flex: 1, justifyContent: 'center', gap: 18 },
  questionNumber: { color: '#b4bfd7', fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  progressTrack: { height: 7, backgroundColor: '#363c53', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#67a8ff', borderRadius: 4 },
  questionCard: { minHeight: 260, paddingHorizontal: 25, paddingVertical: 30, borderRadius: 24, backgroundColor: '#2b3047', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#3c435e' },
  questionText: { color: '#ffffff', fontSize: 23, lineHeight: 34, fontWeight: '600', textAlign: 'center' },
  answerArea: { gap: 12 },
  answerButton: { minHeight: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 15, elevation: 3 },
  trueButton: { backgroundColor: '#27a96f' },
  falseButton: { backgroundColor: '#df5262' },
  answerButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '900', letterSpacing: 2 },
  pressed: { opacity: 0.75, transform: [{ scale: 0.985 }] },
  historyRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 34, alignItems: 'center', marginTop: 4 },
  historyDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  historyMark: { color: '#202437', fontSize: 17, fontWeight: '900' },
  resultCard: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  resultBadge: { width: 74, height: 74, borderRadius: 37, backgroundColor: '#30364e', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  resultEmoji: { fontSize: 34, color: '#68e1aa' },
  resultEyebrow: { color: '#9ca6c2', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  resultTitle: { color: '#ffffff', fontSize: 54, fontWeight: '900', marginTop: 10 },
  resultText: { color: '#c0c8da', fontSize: 16, textAlign: 'center', marginTop: 8 },
  restartButton: { width: '100%', minHeight: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#67a8ff', marginTop: 34 },
  restartText: { color: '#17213a', fontSize: 15, fontWeight: '900', letterSpacing: 1.5 },
});
