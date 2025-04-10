import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Image, Linking, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';

export default function HelpSupport() {
    const navigation = useNavigation();
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    const faqs = [
        {
            id: 1,
            question: "How do I discover local community groups?",
            answer: "To discover community groups in your area, use the 'Discover Nearby' feature and browse through groups by category or distance. When you find an interesting group, tap 'Follow' to stay updated with their activities and events."
        },
        {
            id: 2,
            question: "How can I create and manage my local group?",
            answer: "If you're organizing a local community initiative, tap on 'Create Group' from your profile. Once approved, you'll get admin access to post events, manage members, and share updates that will be visible to people in your locality."
        },
        {
            id: 3,
            question: "How do I add a local event or opportunity?",
            answer: "Group admins can create local events by tapping 'Add Local Listing' from the dashboard. Fill in event details including location, time, cover image, and set a visibility radius to help nearby community members discover your event."
        },
        {
            id: 4,
            question: "Who can I contact for technical assistance?",
            answer: "For any technical issues, account questions, or help with promoting your local initiatives, contact our dedicated support team at thisiscampuslink@gmail.com. We're committed to supporting community connections and typically respond within 24 hours."
        }
    ];

    const developers = [
        {
            id: 1,
            name: "Kriithik SS",
            role: "Lead Developer",
            bio: "Full-stack developer specializing in location-based community platforms and React Native applications.",
            linkedIn: "https://www.linkedin.com/in/kriithikss?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            image: require('../../assets/images/kriithik.jpg'),
        },
        {
            id: 2,
            name: "Kathir Chelvan",
            role: "Lead Developer",
            bio: "Full-stack developer focused on creating technology that strengthens local community connections.",
            linkedIn: "https://in.linkedin.com/in/kathirchelvan-ilamparithim-76666828a",
            image: require('../../assets/images/kathir.jpg'),
        }
    ];

    const toggleFAQ = (id) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    const openLink = (url) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView 
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Animated.View style={{...styles.content, opacity: fadeAnim}}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerIcon}>❓</Text>
                    <Text style={styles.title}>Community Support</Text>
                </View>
                
                <Text style={styles.description}>
                    Welcome to CommunityLink! Discover local events, groups, and opportunities happening right in your neighborhood, even when offline.
                </Text>

                <View style={styles.faqSection}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                    {faqs.map((faq) => (
                        <TouchableOpacity 
                            key={faq.id} 
                            style={[
                                styles.faqItem, 
                                { 
                                    backgroundColor: expandedFAQ === faq.id 
                                        ? Colors.LIGHTBLUE || '#E6F2FF' 
                                        : Colors.WHITE
                                }
                            ]} 
                            onPress={() => toggleFAQ(faq.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.faqHeader}>
                                <Text style={styles.faqQuestion}>{faq.question}</Text>
                                <Text style={styles.expandIcon}>
                                    {expandedFAQ === faq.id ? '▲' : '▼'}
                                </Text>
                            </View>
                            {expandedFAQ === faq.id && (
                                <Text style={styles.faqAnswer}>{faq.answer}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity 
                    style={styles.contactSection}
                    onPress={() => {
                        Linking.openURL('mailto:thisiscampuslink@gmail.com');
                    }}
                    activeOpacity={0.8}
                >
                    <View style={styles.contactGradient}>
                        <Text style={styles.contactTitle}>Contact Local Support</Text>
                        <Text style={styles.contactText}>
                            Need help with finding nearby events or managing your community initiatives? Our team is here to support your local connections.
                        </Text>
                        <View style={styles.emailContainer}>
                            <Text style={styles.emailIcon}>✉️</Text>
                            <Text style={styles.email}>thisiscampuslink@gmail.com</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.developersSection}>
                    <Text style={styles.sectionTitle}>Meet Our Developers</Text>
                    <Text style={styles.sectionSubtitle}>The team building technology for local communities</Text>
                    
                    <View style={styles.developersContainer}>
                        {developers.map((developer) => (
                            <View key={developer.id} style={styles.developerCard}>
                                <View style={styles.developerImageContainer}>
                                    <Image 
                                        source={developer.image} 
                                        style={styles.developerImage}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={styles.developerInfo}>
                                    <Text style={styles.developerName}>{developer.name}</Text>
                                    <Text style={styles.developerRole}>{developer.role}</Text>
                                    <Text style={styles.developerBio}>{developer.bio}</Text>
                                    
                                    <TouchableOpacity 
                                        style={styles.linkedInButton}
                                        onPress={() => openLink(developer.linkedIn)}
                                        activeOpacity={0.8}
                                    >
                                        <View style={styles.linkedInIconContainer}>
                                            <Text style={styles.linkedInIcon}>in</Text>
                                        </View>
                                        <Text style={styles.linkedInText}>Connect on LinkedIn</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.appVersionSection}>
                    <Text style={styles.versionLabel}>App Version</Text>
                    <Text style={styles.versionNumber}>1.2.0</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>CommunityLink © 2025</Text>
                    <Text style={styles.footerSubtext}>Connecting Neighbors, Strengthening Communities</Text>
                </View>
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND || '#F5F5F5',
    },
    content: {
        paddingBottom: 30,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        marginBottom: 10,
    },
    headerIcon: {
        fontSize: 26,
        marginRight: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.PRIMARY || '#007BFF',
    },
    description: {
        fontSize: 16,
        color: Colors.GRAY || '#666',
        paddingHorizontal: 20,
        marginBottom: 25,
        textAlign: 'center',
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: Colors.PRIMARY || '#007BFF',
        textAlign: 'center',
    },
    sectionSubtitle: {
        fontSize: 16,
        color: Colors.GRAY || '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    faqSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    faqItem: {
        padding: 15,
        backgroundColor: Colors.WHITE || 'white',
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.LIGHTGRAY || '#E0E0E0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.DARK || '#333',
        flex: 1,
        marginRight: 10,
    },
    expandIcon: {
        fontSize: 16,
        color: Colors.GRAY || '#888',
    },
    faqAnswer: {
        fontSize: 15,
        color: Colors.GRAY || '#666',
        marginTop: 12,
        lineHeight: 22,
    },
    contactSection: {
        marginHorizontal: 20,
        marginBottom: 35,
        borderRadius: 20,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    contactGradient: {
        padding: 25,
        backgroundColor: Colors.PRIMARY || '#007BFF',
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 12,
    },
    contactText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 16,
        opacity: 0.9,
        lineHeight: 22,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    emailIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    email: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    developersSection: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    developersContainer: {
        alignItems: 'center',
    },
    developerCard: {
        width: '95%',
        backgroundColor: Colors.WHITE || 'white',
        borderRadius: 20,
        marginBottom: 25,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    developerImageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: Colors.LIGHTGRAY || '#f0f0f0',
    },
    developerImage: {
        width: '100%',
        height: '100%',
    },
    developerInfo: {
        padding: 25,
    },
    developerName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.DARK || '#333',
        marginBottom: 6,
    },
    developerRole: {
        fontSize: 16,
        color: Colors.PRIMARY || '#007BFF',
        marginBottom: 12,
        fontWeight: '600',
    },
    developerBio: {
        fontSize: 15,
        color: Colors.GRAY || '#666',
        marginBottom: 18,
        lineHeight: 22,
    },
    linkedInButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0077B5',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    linkedInIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    linkedInIcon: {
        color: '#0077B5',
        fontWeight: 'bold',
        fontSize: 18,
    },
    linkedInText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    appVersionSection: {
        marginTop: 15,
        marginBottom: 20,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    versionLabel: {
        fontSize: 14,
        color: Colors.GRAY || '#888',
        marginRight: 8,
    },
    versionNumber: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.DARK || '#555',
    },
    footer: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.GRAY || '#666',
    },
    footerSubtext: {
        fontSize: 12,
        color: Colors.GRAY || '#888',
        marginTop: 5,
    }
});